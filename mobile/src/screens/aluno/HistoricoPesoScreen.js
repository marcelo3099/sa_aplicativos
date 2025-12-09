import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { historicoPesoAPI } from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HistoricoPesoScreen = () => {
  const { user } = useAuth();
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [novoPeso, setNovoPeso] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    loadRegistros();
  }, []);

  const loadRegistros = async () => {
    try {
      const response = await historicoPesoAPI.getHistoricoPesoByAluno(user.id);
      // Ordenar por data mais recente primeiro
      const sortedRegistros = response.data.sort((a, b) => new Date(b.data_registro) - new Date(a.data_registro));
      setRegistros(sortedRegistros);
    } catch (error) {
      console.error('Erro ao carregar histórico de peso:', error);
      Alert.alert('Erro', 'Não foi possível carregar o histórico de peso');
    } finally {
      setLoading(false);
    }
  };

  const adicionarRegistro = async () => {
    if (!novoPeso || parseFloat(novoPeso) <= 0) {
      Alert.alert('Erro', 'Por favor, informe um peso válido');
      return;
    }

    try {
      const response = await historicoPesoAPI.createHistoricoPeso({
        aluno_id: user.id,
        peso: parseFloat(novoPeso),
        observacoes: observacoes,
      });

      // Atualizar a lista
      const novoRegistro = response.data;
      setRegistros([novoRegistro, ...registros]);
      setNovoPeso('');
      setObservacoes('');
      setShowAddForm(false);
      Alert.alert('Sucesso', 'Registro de peso adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar registro:', error);
      Alert.alert('Erro', 'Não foi possível adicionar o registro de peso');
    }
  };

  const renderRegistro = ({ item }) => (
    <View style={styles.registroCard}>
      <View style={styles.registroHeader}>
        <Icon name="scale" size={24} color="#2196F3" />
        <Text style={styles.peso}>{item.peso} kg</Text>
        <Text style={styles.data}>{new Date(item.data_registro).toLocaleDateString()}</Text>
      </View>
      {item.observacoes ? (
        <Text style={styles.observacoes}>{item.observacoes}</Text>
      ) : null}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Carregando histórico...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Histórico de Peso</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setShowAddForm(!showAddForm)}
        >
          <Icon name={showAddForm ? "close" : "add"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {showAddForm && (
        <View style={styles.addForm}>
          <TextInput
            style={styles.input}
            value={novoPeso}
            onChangeText={setNovoPeso}
            placeholder="Peso (kg)"
            keyboardType="decimal-pad"
          />
          <TextInput
            style={styles.input}
            value={observacoes}
            onChangeText={setObservacoes}
            placeholder="Observações (opcional)"
          />
          <View style={styles.formButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddForm(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={adicionarRegistro}>
              <Text style={styles.saveButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {registros.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="scale" size={60} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum registro de peso</Text>
          <Text style={styles.emptySubtext}>Adicione seu primeiro registro usando o botão acima</Text>
        </View>
      ) : (
        <FlatList
          data={registros}
          renderItem={renderRegistro}
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
  registroCard: {
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
  registroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  peso: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  data: {
    fontSize: 14,
    color: '#666',
  },
  observacoes: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    lineHeight: 20,
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
  addForm: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default HistoricoPesoScreen;