import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { treinoAPI, exercicioAPI } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TreinoDetailScreen = () => {
  const route = useRoute();
  const { treinoId } = route.params;
  const [treino, setTreino] = useState(null);
  const [exercicios, setExercicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTreinoDetails();
  }, []);

  const loadTreinoDetails = async () => {
    try {
      // Carregar detalhes do treino
      const treinoResponse = await treinoAPI.getTreinoById(treinoId);
      setTreino(treinoResponse.data);

      // Carregar exercícios do treino
      const exerciciosResponse = await treinoAPI.getExerciciosByTreino(treinoId);
      setExercicios(exerciciosResponse.data);
    } catch (error) {
      console.error('Erro ao carregar detalhes do treino:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes do treino');
    } finally {
      setLoading(false);
    }
  };

  const renderExercicio = ({ item }) => (
    <View style={styles.exercicioCard}>
      <View style={styles.exercicioHeader}>
        <Icon name="fitness-center" size={20} color="#2196F3" />
        <Text style={styles.exercicioNome}>{item.nome}</Text>
      </View>
      <Text style={styles.exercicioDescricao}>{item.descricao}</Text>
      <View style={styles.exercicioDetails}>
        <Text style={styles.exercicioDetail}>Séries: {item.series}</Text>
        <Text style={styles.exercicioDetail}>Repetições: {item.repeticoes}</Text>
        {item.carga && <Text style={styles.exercicioDetail}>Carga: {item.carga} kg</Text>}
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Carregando detalhes do treino...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>{treino?.titulo}</Text>
        <Text style={styles.categoria}>{treino?.categoria} • {treino?.nivel}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.descricao}>{treino?.descricao}</Text>
        <Text style={styles.dataCriacao}>Criado em: {new Date(treino?.data_criacao).toLocaleDateString()}</Text>
      </View>
      
      <View style={styles.exerciciosContainer}>
        <Text style={styles.exerciciosTitle}>Exercícios</Text>
        
        {exercicios.length === 0 ? (
          <View style={styles.emptyExercicios}>
            <Icon name="fitness-center" size={40} color="#ccc" />
            <Text style={styles.emptyText}>Nenhum exercício encontrado</Text>
          </View>
        ) : (
          <FlatList
            data={exercicios}
            renderItem={renderExercicio}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.exerciciosList}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  categoria: {
    fontSize: 16,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descricao: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 10,
  },
  dataCriacao: {
    fontSize: 14,
    color: '#999',
  },
  exerciciosContainer: {
    flex: 1,
    marginTop: 10,
    margin: 10,
  },
  exerciciosTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  exerciciosList: {
    paddingBottom: 20,
  },
  exercicioCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exercicioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  exercicioNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  exercicioDescricao: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  exercicioDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  exercicioDetail: {
    backgroundColor: '#e3f2fd',
    color: '#2196F3',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 5,
  },
  loadingText: {
    textAlign: 'center',
    padding: 50,
    fontSize: 16,
    color: '#666',
  },
  emptyExercicios: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});

export default TreinoDetailScreen;