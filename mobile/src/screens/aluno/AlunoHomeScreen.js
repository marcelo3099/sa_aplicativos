import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AlunoHomeScreen = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bem-vindo(a),</Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="fitness-center" size={40} color="#2196F3" />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Treinos</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="restaurant" size={40} color="#4CAF50" />
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Dietas</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="chat" size={40} color="#FF9800" />
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Mensagens</Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="fitness-center" size={30} color="#fff" />
            <Text style={styles.actionText}>Meus Treinos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="restaurant" size={30} color="#fff" />
            <Text style={styles.actionText}>Minhas Dietas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="chat" size={30} color="#fff" />
            <Text style={styles.actionText}>Conversas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Icon name="info" size={24} color="#2196F3" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            Siga seu plano de treino e alimentação para atingir seus objetivos!
          </Text>
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
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    width: '30%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
});

export default AlunoHomeScreen;