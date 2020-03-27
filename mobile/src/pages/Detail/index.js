import React from 'react';
import {View, TouchableOpacity, Image, Text, Linking} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer';
import styles from './styles';

import logoImg from '../../assets/logo.png';

export default function Detail(){

  const message = 'Olá APAD, estou entrado em contato a respeito do caso da cadelinha atropelada';
  const navigation = useNavigation();
  function navigateBack(){
    navigation.goBack();
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=5511987006046&text=${message}`)
  }

  function sendMail(){
    MailComposer.composeAsync({
      subject: `Herói do caso: Cadelinha atropelada`,
      recipients: ['leandroabmathias@gmail.com'],
      body: message,
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
        <Text style={styles.incidentValue}>APAD</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>Cadelinha atropelada</Text>

        <Text style={styles.incidentProperty}>Valor</Text>
        <Text style={styles.incidentValue}>R$ 120,00</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}