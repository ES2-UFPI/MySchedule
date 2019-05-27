import { createAppContainer } from "react-navigation";
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerNavigator } from "react-navigation";

import Calendario from './src/components/Calendario';
import Dias from './src/screens/TelaExibicaoDia';
import Semanas from './src/components/semanas';
import CadastroAtividade from './src/screens/TelaCadastroAtividade'
import ListaAtividade from './src/components/ListaAtividades'
import Login from './src/screens/TelaLogin'


const navigator = createDrawerNavigator({
  
    listaAtividade: createStackNavigator({
        screen: ListaAtividade,
        cadastroDeAtividade: CadastroAtividade
      }),
    
    lista: 
      createStackNavigator({
        screen: Dias,
        cadastroDeAtividade: CadastroAtividade
      }), 
    
  })
  const App = createAppContainer(navigator)
  
  export default App;
  