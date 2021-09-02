/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Instana from '@instana/react-native-agent';
import axios, {AxiosRequestConfig} from 'axios';
import fetchAdapter from '@vespaiach/axios-fetch-adapter';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';

  React.useEffect(() => {
    const INSTANA_APP_KEY = 'xxxxxxxxxxxxxxxxxxxxxx';
    const INSTANA_REPORTING_URL = 'https://eum-blue-saas.instana.io/mobile';
    Instana.setup(INSTANA_APP_KEY, INSTANA_REPORTING_URL);
    Instana.setIgnoreURLsByRegex(['http://localhost:8081.*']);
  }, []);

  const httpClient = axios.create({adapter: fetchAdapter});
  // const httpClient = fetch; // this works!

  const callAxios = async () => {
    try {
      console.log('callAxios');
      let response = await httpClient('https://reactnative.dev/movies.json');
      let json = await response.data;
      console.log('callAxios', 'success', response);
    } catch (error) {
      console.warn('callAxios', error);
    }
  };

  const callFetch = async () => {
    try {
      console.log('callFetch');
      let stageOne = await fetch('https://reactnative.dev/movies.json');
      const response = {
        ok: stageOne.ok,
        status: stageOne.status,
        statusText: stageOne.statusText,
        headers: new Headers(stageOne.headers), // Make a copy of headers
      };
      let json = await stageOne.json();
      console.log('callFetch', 'success', response, json);
    } catch (error) {
      console.warn('callFetch', error);
    }
  };

  const onRunXMLHttpRequest = async () => {
    console.log('onRunXMLHttpRequest');
    var request = new XMLHttpRequest();
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        return;
      }
      console.log('*** onRunXMLHttpRequest', {
        status: request.status,
        statusText: request.statusText,
        responseText: request.responseText,
        e,
        request,
      });

      if (request.status === 200) {
        console.log('onRunXMLHttpRequest', 'success', request.responseText);
      } else {
        console.log('onRunXMLHttpRequest', 'error');
      }
    };

    request.open('GET', 'https://reactnative.dev/movies.json');
    request.send();
  };

  const onClick = () => {
    // callAxios();
    // callFetch();
    onRunXMLHttpRequest();

    //// const config: AxiosRequestConfig = {
    ////   method: 'POST',
    ////   data: 'username=test%40vaillant.de&password=sekret&grant_type=password_public',
    ////   headers: {
    ////     accept: 'application/json, text/plain, */*',
    ////     'content-type': 'application/x-www-form-urlencoded',
    ////   },
    //// };
    //// console.log('click', config);
    //// httpClient('https://httpbin.org/post', config)
    ////   .then(response =>
    ////     console.log('RESP: ', {
    ////       status: response.status,
    ////       statusText: response.statusText,
    ////       response: response.json,
    ////     }),
    ////   )
    ////   .catch(reason => console.log('CATCH:', reason))
    ////   .finally(() => console.log('FINALLY'));
  };

  return (
    <View style={styles.sectionContainer}>
      <Text
        onPress={onClick}
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
