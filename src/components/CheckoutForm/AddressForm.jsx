import React, {useEffect, useState} from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextField';
import { commerce } from '../../lib/commerce';
import { Link } from 'react-router-dom';



const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);  
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);  
  const [shippingSubdivision, setShippingSubdivision] = useState('');    
  const [shippingOptions, setShippingOptions] = useState([]);  
  const [shippingOption, setShippingOption] = useState(''); 
  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
  const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
  
  setShippingCountries(countries);
  setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
    setShippingSubdivisions(subdivisions);
     setShippingSubdivision(Object.keys(subdivisions)[0]);
    };
  
    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
      const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
      console.log(options);
      setShippingOptions(options);
      setShippingOption(options[0].id);
      };

      useEffect(() =>{
      fetchShippingCountries(checkoutToken.id);
      },[]);

      useEffect(() =>{
        if(shippingCountry) fetchSubdivisions(shippingCountry);
        },[shippingCountry]);
    
      useEffect(() =>{
      if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
      },[shippingSubdivision]);

  return (
    <div>
        <Typography variant="h6" gutterBottom>Shipping address</Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
              <Grid container spacing={3}>
                <FormInput  name='firstName' label='First Name'></FormInput>
                <FormInput  name='lastName' label='Last Name'></FormInput>
                <FormInput  name='address1' label='Address'></FormInput>
                <FormInput  name='email' label='Email'></FormInput>
                <FormInput  name='city' label='City'></FormInput>
                <FormInput  name='ZIP' label='ZIP / Postal code'></FormInput>

                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Country</InputLabel>
                  <Select value={shippingCountry} fullWidth 
                  onChange={(e) => setShippingCountry(e.target.value)}> 
                    {Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name })).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>))}
                  </Select>
                </Grid>

                  <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Subdivision</InputLabel>
                  <Select value={shippingSubdivision} fullWidth 
                  onChange={(e) => setShippingSubdivision(e.target.value)}> 
                    {Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name })).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>))}
                  </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Options</InputLabel>
                  <Select value={shippingOption} fullWidth 
                  onChange={(e) => setShippingOption(e.target.value)}>
                    {shippingOptions.map((s0) => ({id: s0.id, label: `${s0.description} - (${s0.price.formatted_with_symbol})`})).map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.label}
                    </MenuItem>))}
                  </Select>
                </Grid>  


              </Grid>
              <br />
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button component={Link} to="/cart" variant="outlined">Back</Button>
                <Button type="submit" variant="contained" color="primary">Next</Button>
              </div>
          </form>
        </FormProvider>
    </div>
  )
}

export default AddressForm