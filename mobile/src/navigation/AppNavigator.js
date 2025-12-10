import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet } from 'react-native';

// Telas de autenticação
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Telas principais - Aluno
import AlunoHomeScreen from '../screens/aluno/AlunoHomeScreen';
import AlunoProfileScreen from '../screens/aluno/AlunoProfileScreen';
import TreinosScreen from '../screens/aluno/TreinosScreen';
import DietasScreen from '../screens/aluno/DietasScreen';
import ConversasScreen from '../screens/aluno/ConversasScreen';
import HistoricoPesoScreen from '../screens/aluno/HistoricoPesoScreen';

// Telas principais - Personal
import PersonalHomeScreen from '../screens/personal/PersonalHomeScreen';
import PersonalProfileScreen from '../screens/personal/PersonalProfileScreen';
import PersonalTreinosScreen from '../screens/personal/PersonalTreinosScreen';
import PersonalDietasScreen from '../screens/personal/PersonalDietasScreen';
import PersonalConversasScreen from '../screens/personal/PersonalConversasScreen';
import PersonalAlunosScreen from '../screens/personal/PersonalAlunosScreen';

// Telas de detalhes
import TreinoDetailScreen from '../screens/TreinoDetailScreen';
import ExercicioDetailScreen from '../screens/ExercicioDetailScreen';
import DietaDetailScreen from '../screens/DietaDetailScreen';
import ConversaDetailScreen from '../screens/ConversaDetailScreen';

import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tela de carregamento
const SplashScreen = () => (
  <View style={styles.splashContainer}>
    <Text style={styles.splashText}>Carregando FikiFit...</Text>
  </View>
);

// Navegação para Alunos
const AlunoTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Treinos') {
            iconName = 'fitness-center';
          } else if (route.name === 'Dietas') {
            iconName = 'restaurant';
          } else if (route.name === 'Conversas') {
            iconName = 'chat';
          } else if (route.name === 'Perfil') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6A0DAD', // Roxo forte
        tabBarInactiveTintColor: '#9B4DCA', // Roxo mais fraco
      })}
    >
      <Tab.Screen name="Home" component={AlunoHomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Treinos" component={TreinosScreen} />
      <Tab.Screen name="Dietas" component={DietasScreen} />
      <Tab.Screen name="Conversas" component={ConversasScreen} />
      <Tab.Screen name="Perfil" component={AlunoProfileScreen} />
    </Tab.Navigator>
  );
};

// Navegação para Personais
const PersonalTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Treinos') {
            iconName = 'fitness-center';
          } else if (route.name === 'Dietas') {
            iconName = 'restaurant';
          } else if (route.name === 'Conversas') {
            iconName = 'chat';
          } else if (route.name === 'Alunos') {
            iconName = 'people';
          } else if (route.name === 'Perfil') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6A0DAD', // Roxo forte
        tabBarInactiveTintColor: '#9B4DCA', // Roxo mais fraco
      })}
    >
      <Tab.Screen name="Home" component={PersonalHomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Treinos" component={PersonalTreinosScreen} />
      <Tab.Screen name="Dietas" component={PersonalDietasScreen} />
      <Tab.Screen name="Conversas" component={PersonalConversasScreen} />
      <Tab.Screen name="Alunos" component={PersonalAlunosScreen} />
      <Tab.Screen name="Perfil" component={PersonalProfileScreen} />
    </Tab.Navigator>
  );
};

// Navegação principal baseada no tipo de usuário
const MainNavigator = () => {
  const { isAuthenticated, userType, loading } = useAuth();

  if (loading) {
    // Tela de carregamento
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Registrar' }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName={userType === 'professor' ? 'PersonalTabs' : 'AlunoTabs'}>
      {/* Navegação para alunos */}
      <Stack.Screen name="AlunoTabs" component={AlunoTabs} options={{ headerShown: false }} />

      {/* Navegação para personais */}
      <Stack.Screen name="PersonalTabs" component={PersonalTabs} options={{ headerShown: false }} />

      {/* Telas de detalhes */}
      <Stack.Screen
        name="TreinoDetail"
        component={TreinoDetailScreen}
        options={{ title: 'Detalhes do Treino' }}
      />
      <Stack.Screen
        name="DietaDetail"
        component={DietaDetailScreen}
        options={{ title: 'Detalhes da Dieta' }}
      />
      <Stack.Screen
        name="ConversaDetail"
        component={ConversaDetailScreen}
        options={{ title: 'Conversa' }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A0DAD', // Roxo forte
  },
  splashText: {
    fontSize: 18,
    color: '#FFFFFF', // Branco para contraste com o fundo roxo
  },
});

export default AppNavigator;