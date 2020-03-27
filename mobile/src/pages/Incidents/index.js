import React, { useState ,useEffect } from 'react';
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import { Feather } from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import styles from './styles';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

export default function Incidents(){
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([]);

  function navigateToDetail(){
    navigation.navigate('Detail');
  }

  async function loadIncidents(){
    const response = await api.get('incidents');
    setIncidents(response.data);
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text styles={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>0 casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text styles={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList 
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>

            <Text style={styles.incidentProperty}>Valor</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency', 
                currency: 'BRL'
                }).format(incident.value)}
              </Text>

            <TouchableOpacity style={styles.detailsButton} onPress={navigateToDetail}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}