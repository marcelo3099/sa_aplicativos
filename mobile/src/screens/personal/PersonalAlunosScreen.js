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
import { userAPI, conversaAPI } from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PersonalAlunosScreen = () => {
  const { user } = useAuth();
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlunos();
  }, []);

  const loadAlunos = async () => {
    try {
      // Primeiro, vamos obter todas as conversas onde o personal é o professor
      const response = await conversaAPI.getConversasByPersonal(user.id);
      
      // Em seguida, obter informações de cada aluno envolvido nas conversas
      const alunosPromises = await Promise.all(
        response.data.map(async (conversa) => {
          try {
            const alunoResponse = await userAPI.getUserById(conversa.aluno_id);
            return {
              ...alunoResponse.data,
              conversa_id: conversa.id,
              data_inicio_conversa: conversa.data_inicio
            };
          } catch (error) {
            console.error('Erro ao carregar aluno:', error);
            return null;
          }
        })
      );
      
      const alunosValidos = alunosPromises.filter(aluno => aluno !== null);
      setAlunos(alunosValidos);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os alunos');
    } finally {
      setLoading(false);
    }
  };

  const renderAluno = ({ item }) => (
    <TouchableOpacity style={styles.alunoCard}>
      <View style={styles.alunoHeader}>
        <View style={styles.avatarContainer}>
          <Icon name="person" size={30} color="#2196F3" style={styles.avatarIcon} />
        </View>
        <View style={styles.alunoInfo}>
          <Text style={styles.alunoNome}>{item.name}</Text>
          <Text style={styles.alunoEmail}>{item.email}</Text>
        </View>
        <Icon name="chat" size={24} color="#2196F3" />
      </View>
      <View style={styles.alunoDetails}>
        <Text style={styles.detailItem}>Telefone: {item.telefone || 'Não informado'}</Text>
        <Text style={styles.detailItem}>Objetivo: {item.objetivo || 'Não informado'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Carregando alunos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Alunos</Text>
      </View>
      
      {alunos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="people" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum aluno encontrado</Text>
          <Text style={styles.emptySubtext}>Comece criando conversas com alunos</Text>
        </View>
      ) : (
        <FlatList
          data={alunos}
          renderItem={renderAluno}
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
  alunoCard: {
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
  alunoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    // O ícone já está centralizado no container
  },
  alunoInfo: {
    flex: 1,
    marginLeft: 10,
  },
  alunoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  alunoEmail: {
    fontSize: 14,
    color: '#666',
  },
  alunoDetails: {
    marginLeft: 50,
  },
  detailItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
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

export default PersonalAlunosScreen;