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
import { useAuth } from '../../context/AuthContext';
import { dietaAPI } from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DietasScreen = () => {
  const { user } = useAuth();
  const [dietas, setDietas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDietas();
  }, []);

  const loadDietas = async () => {
    try {
      const response = await dietaAPI.getDietasByAluno(user.id);
      setDietas(response.data);
    } catch (error) {
      console.error('Erro ao carregar dietas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as dietas');
    } finally {
      setLoading(false);
    }
  };

  const renderDieta = ({ item }) => (
    <TouchableOpacity style={styles.dietaCard}>
      <View style={styles.dietaHeader}>
        <Icon name="restaurant" size={24} color="#4CAF50" />
        <View style={styles.dietaInfo}>
          <Text style={styles.dietaTitle}>{item.titulo}</Text>
          <Text style={styles.dietaSubtitle}>{item.tipo_dieta}</Text>
        </View>
        <Icon name="chevron-right" size={24} color="#ccc" />
      </View>
      <Text style={styles.dietaDescricao}>{item.descricao}</Text>
      {item.data_inicio && (
        <Text style={styles.dietaDate}>Início: {new Date(item.data_inicio).toLocaleDateString()}</Text>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Carregando dietas...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Dietas</Text>
      </View>
      
      {dietas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="restaurant" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Nenhuma dieta encontrada</Text>
          <Text style={styles.emptySubtext}>Seu personal ainda não criou dietas para você</Text>
        </View>
      ) : (
        <FlatList
          data={dietas}
          renderItem={renderDieta}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    padding: 20,
  },
  dietaCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dietaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dietaInfo: {
    flex: 1,
    marginLeft: 10,
  },
  dietaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dietaSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  dietaDescricao: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 5,
  },
  dietaDate: {
    fontSize: 12,
    color: '#999',
  },
  loadingText: {
    textAlign: 'center',
    padding: 50,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default DietasScreen;