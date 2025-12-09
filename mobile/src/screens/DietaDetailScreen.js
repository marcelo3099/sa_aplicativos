import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { dietaAPI } from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DietaDetailScreen = () => {
  const route = useRoute();
  const { dietaId } = route.params;
  const [dieta, setDieta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDietaDetails();
  }, []);

  const loadDietaDetails = async () => {
    try {
      // Carregar detalhes da dieta
      const dietaResponse = await dietaAPI.getDietaById(dietaId);
      setDieta(dietaResponse.data);
    } catch (error) {
      console.error('Erro ao carregar detalhes da dieta:', error);
      Alert.alert('Erro', 'Não foi possível carregar os detalhes da dieta');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Carregando detalhes da dieta...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.titulo}>{dieta?.titulo}</Text>
          <Text style={styles.tipoDieta}>{dieta?.tipo_dieta}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.descricao}>{dieta?.descricao}</Text>
          
          <View style={styles.dateContainer}>
            <View style={styles.dateItem}>
              <Icon name="date-range" size={20} color="#2196F3" />
              <View>
                <Text style={styles.dateLabel}>Início</Text>
                <Text style={styles.dateValue}>{dieta?.data_inicio ? new Date(dieta.data_inicio).toLocaleDateString() : 'Não definido'}</Text>
              </View>
            </View>
            
            {dieta?.data_fim && (
              <View style={styles.dateItem}>
                <Icon name="event" size={20} color="#4CAF50" />
                <View>
                  <Text style={styles.dateLabel}>Fim</Text>
                  <Text style={styles.dateValue}>{new Date(dieta.data_fim).toLocaleDateString()}</Text>
                </View>
              </View>
            )}
          </View>
          
          {dieta?.observacoes && (
            <View style={styles.observacoesContainer}>
              <Text style={styles.observacoesLabel}>Observações</Text>
              <Text style={styles.observacoesValue}>{dieta.observacoes}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.refeicoesContainer}>
          <View style={styles.refeicoesHeader}>
            <Icon name="restaurant" size={24} color="#4CAF50" />
            <Text style={styles.refeicoesTitle}>Refeições</Text>
          </View>
          
          <View style={styles.refeicoesList}>
            {/* Exemplo de refeições - na implementação real, essas informações viriam da API */}
            <View style={styles.refeicaoItem}>
              <View style={styles.refeicaoHeader}>
                <Text style={styles.refeicaoNome}>Café da Manhã</Text>
                <Text style={styles.refeicaoHorario}>07:00</Text>
              </View>
              <Text style={styles.refeicaoDescricao}>2 ovos mexidos, 2 fatias de pão integral, 1 xícara de café</Text>
              <View style={styles.ingredientesContainer}>
                <Text style={styles.ingredientesLabel}>Ingredientes:</Text>
                <Text style={styles.ingrediente}>• 2 ovos - 140 calorias</Text>
                <Text style={styles.ingrediente}>• 2 fatias de pão integral - 160 calorias</Text>
                <Text style={styles.ingrediente}>• Café sem açúcar - 2 calorias</Text>
              </View>
            </View>
            
            <View style={styles.refeicaoItem}>
              <View style={styles.refeicaoHeader}>
                <Text style={styles.refeicaoNome}>Lanche da Manhã</Text>
                <Text style={styles.refeicaoHorario}>10:00</Text>
              </View>
              <Text style={styles.refeicaoDescricao}>1 banana, 150ml de leite desnatado</Text>
            </View>
            
            <View style={styles.refeicaoItem}>
              <View style={styles.refeicaoHeader}>
                <Text style={styles.refeicaoNome}>Almoço</Text>
                <Text style={styles.refeicaoHorario}>12:30</Text>
              </View>
              <Text style={styles.refeicaoDescricao}>150g de frango grelhado, 2 colheres de arroz integral, salada à vontade</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingBottom: 20,
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
  tipoDieta: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
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
    marginBottom: 15,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.48,
  },
  dateLabel: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  dateValue: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    fontWeight: '600',
  },
  observacoesContainer: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  observacoesLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginBottom: 5,
  },
  observacoesValue: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  refeicoesContainer: {
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
  refeicoesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  refeicoesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  refeicoesList: {
    marginTop: 10,
  },
  refeicaoItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  refeicaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  refeicaoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  refeicaoHorario: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  refeicaoDescricao: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  ingredientesContainer: {
    marginTop: 8,
  },
  ingredientesLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginBottom: 5,
  },
  ingrediente: {
    fontSize: 13,
    color: '#666',
    marginLeft: 10,
    marginBottom: 3,
  },
  loadingText: {
    textAlign: 'center',
    padding: 50,
    fontSize: 16,
    color: '#666',
  },
});

export default DietaDetailScreen;