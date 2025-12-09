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
import { treinoAPI, userAPI } from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PersonalTreinosScreen = () => {
  const { user } = useAuth();
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTreinos();
  }, []);

  const loadTreinos = async () => {
    try {
      const response = await treinoAPI.getTreinosByPersonal(user.id);
      // Carregar informações dos alunos associados aos treinos
      const treinosComAluno = await Promise.all(
        response.data.map(async (treino) => {
          try {
            const alunoResponse = await userAPI.getUserById(treino.aluno_id);
            return {
              ...treino,
              aluno: alunoResponse.data
            };
          } catch (error) {
            console.error('Erro ao carregar aluno:', error);
            return {
              ...treino,
              aluno: { name: 'Aluno não encontrado' }
            };
          }
        })
      );
      setTreinos(treinosComAluno);
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os treinos');
    } finally {
      setLoading(false);
    }
  };

  const renderTreino = ({ item }) => (
    <TouchableOpacity style={styles.treinoCard}>
      <View style={styles.treinoHeader}>
        <Icon name="fitness-center" size={24} color="#2196F3" />
        <View style={styles.treinoInfo}>
          <Text style={styles.treinoTitle}>{item.titulo}</Text>
          <Text style={styles.treinoSubtitle}>{item.aluno?.name} • {item.categoria}</Text>
        </View>
        <Icon name="chevron-right" size={24} color="#ccc" />
      </View>
      <Text style={styles.treinoDescricao}>{item.descricao}</Text>
      <View style={styles.treinoFooter}>
        <Text style={styles.treinoNivel}>{item.nivel}</Text>
        <Text style={styles.treinoDate}>{new Date(item.data_criacao).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Carregando treinos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Treinos</Text>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {treinos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="fitness-center" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum treino encontrado</Text>
          <Text style={styles.emptySubtext}>Crie seu primeiro treino usando o botão acima</Text>
        </View>
      ) : (
        <FlatList
          data={treinos}
          renderItem={renderTreino}
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
    backgroundColor: '#2196F3',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 20,
  },
  treinoCard: {
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
  treinoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  treinoInfo: {
    flex: 1,
    marginLeft: 10,
  },
  treinoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  treinoSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  treinoDescricao: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  treinoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  treinoNivel: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '600',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  treinoDate: {
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

export default PersonalTreinosScreen;