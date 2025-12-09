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
import { dietaAPI, userAPI } from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PersonalDietasScreen = () => {
  const { user } = useAuth();
  const [dietas, setDietas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDietas();
  }, []);

  const loadDietas = async () => {
    try {
      const response = await dietaAPI.getDietasByPersonal(user.id);
      // Carregar informações dos alunos associados às dietas
      const dietasComAluno = await Promise.all(
        response.data.map(async (dieta) => {
          try {
            const alunoResponse = await userAPI.getUserById(dieta.aluno_id);
            return {
              ...dieta,
              aluno: alunoResponse.data
            };
          } catch (error) {
            console.error('Erro ao carregar aluno:', error);
            return {
              ...dieta,
              aluno: { name: 'Aluno não encontrado' }
            };
          }
        })
      );
      setDietas(dietasComAluno);
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
          <Text style={styles.dietaSubtitle}>{item.aluno?.name} • {item.tipo_dieta}</Text>
        </View>
        <Icon name="chevron-right" size={24} color="#ccc" />
      </View>
      <Text style={styles.dietaDescricao}>{item.descricao}</Text>
      <View style={styles.dietaFooter}>
        <Text style={styles.dietaDate}>Início: {new Date(item.data_inicio).toLocaleDateString()}</Text>
        {item.data_fim && (
          <Text style={styles.dietaDate}>Fim: {new Date(item.data_fim).toLocaleDateString()}</Text>
        )}
      </View>
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
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {dietas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="restaurant" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Nenhuma dieta encontrada</Text>
          <Text style={styles.emptySubtext}>Crie sua primeira dieta usando o botão acima</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 10,
  },
  dietaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default PersonalDietasScreen;