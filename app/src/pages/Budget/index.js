import React, { useState } from 'react';
import {ActivityIndicator, Alert, Text} from 'react-native';
import api from '../../config/api';
import {ScrollView} from 'react-native-gesture-handler';
import {Container,
        TitleInput,
        InputForm,
        BtnSubmitForm,
        TextSubmitForm,
        TitleRequired,
        LoadingArea} from './styles'

export default function Budget(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const cadBudget = async() => {
        //Alert.alert('', 'Send to API');
        if (!validate()) return;

        setLoading(true);
        
        await api.post('/budget',{name,email,phone,message})
        .then((response)=> {
            Alert.alert('',response.data.message);
            setLoading(false);
        }).catch((err) => {
            if (err.response){
                Alert.alert('', err.response.data.message);
                setLoading(false);
            }
            else{
                Alert.alert('','There is a problem connecting with the API. Please, try again later');
                setLoading(false);
            }
        })
        
    }

    const validate = () => {
        if(!name){
            Alert.alert('','Please, input your name');
            return false;
        }
        if(!email){
            Alert.alert('','Please, input your email');
            return false;
        }
        if(!phone){
            Alert.alert('','Please, input your phone');
            return false;
        }
        if(!message){
            Alert.alert('','Please, input your message');
            return false;
        }

        return true;
    }

    return(
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <Container> 
            <TitleInput>* Name</TitleInput>
            <InputForm 
                placeholder="Input your name"
                value={name}
                editable={!loading}
                onChangeText={text => setName(text)}
            />
            <TitleInput>* E-mail</TitleInput>
            <InputForm 
                placeholder="Input your e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                editable={!loading}
                onChangeText={text => setEmail(text)}
            />
            <TitleInput>* Phone</TitleInput>
            <InputForm 
                placeholder="Input your phone"
                value={phone}
                editable={!loading}
                onChangeText={text => setPhone(text)}
            />
            <TitleInput>* Message</TitleInput>
            <InputForm 
                placeholder="Input your needs"
                value={message}
                editable={!loading}
                onChangeText={text => setMessage(text)}
            />
            <TitleRequired>* Required field</TitleRequired>

            <BtnSubmitForm disabled={loading}  onPress={cadBudget}>
                <TextSubmitForm>Submit</TextSubmitForm>
            </BtnSubmitForm>

            {loading &&
                <LoadingArea>
                    <ActivityIndicator 
                    size="large"
                    color="#FFF"/>
                </LoadingArea>}
        </Container>
    </ScrollView>
    )
}