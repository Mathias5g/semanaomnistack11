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
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigateToDetail(incident){
    navigation.navigate('Detail', { incident });
  }

  async function loadIncidents(){

    if(loading){
      return;
    }

    if(total > 0 && incidents.length === total){
      return;
    }

    setLoading(true);

    const response = await api.get('incidents', {
      params: {page}
    }); //metodo para passar parametros incidents?page=${}

    setIncidents([...incidents, ...response.data]); //anexar dois arrays dentro 
    setTotal(response.headers['x-total-count']);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text styles={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text styles={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList 
        style={styles.incidentList}
        data={incidents}
        showsVerticalScrollIndicator={false}
        keyExtractor={incident => String(incident.id)}
        onEndReached={loadIncidents} //Função que carrega no final da lista
        onEndReachedThreshold={0.2} //Porcentagem para carregar o final da lista
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>

            <Text style={styles.incidentProperty}>Valor</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency', 
                currency: 'BRL'
                }).format(incident.value)}
              </Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}