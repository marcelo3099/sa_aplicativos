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
import { conversaAPI, userAPI } from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ConversasScreen = () => {
  const { user } = useAuth();
  const [conversas, setConversas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversas();
  }, []);

  const loadConversas = async () => {
    try {
      const response = await conversaAPI.getConversasByAluno(user.id);
      // Carregar informações dos personais associados às conversas
      const conversasComPersonal = await Promise.all(
        response.data.map(async (conversa) => {
          try {
            const personalResponse = await userAPI.getUserById(conversa.professor_id);
            return {
              ...conversa,
              personal: personalResponse.data
            };
          } catch (error) {
            console.error('Erro ao carregar personal:', error);
            return {
              ...conversa,
              personal: { name: 'Personal não encontrado' }
            };
          }
        })
      );
      setConversas(conversasComPersonal);
    } catch (error) {
      console.error('Erro ao carregar conversas:', error);
      Alert.alert('Erro', 'Não foi possível carregar as conversas');
    } finally {
      setLoading(false);
    }
  };

  const renderConversa = ({ item }) => (
    <TouchableOpacity style={styles.conversaCard}>
      <View style={styles.conversaHeader}>
        <View style={styles.avatarContainer}>
          <Icon name="person" size={30} color="#2196F3" style={styles.avatarIcon} />
        </View>
        <View style={styles.conversaInfo}>
          <Text style={styles.conversaTitle}>{item.personal?.name || 'Personal'}</Text>
          <Text style={styles.conversaLastMessage} numberOfLines={1}>
            {item.ultima_mensagem ? new Date(item.ultima_mensagem).toLocaleString() : 'Nenhuma mensagem ainda'}
          </Text>
        </View>
        <Icon name="chevron-right" size={24} color="#ccc" />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Carregando conversas...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Conversas</Text>
      </View>
      
      {conversas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="chat" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Nenhuma conversa encontrada</Text>
          <Text style={styles.emptySubtext}>Você ainda não tem conversas com personais</Text>
        </View>
      ) : (
        <FlatList
          data={conversas}
          renderItem={renderConversa}
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
  conversaCard: {
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
  conversaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: {
    // O ícone já está centralizado no container
  },
  conversaInfo: {
    flex: 1,
    marginLeft: 15,
  },
  conversaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  conversaLastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
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

export default ConversasScreen;