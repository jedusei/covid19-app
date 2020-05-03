import * as React from 'react';
import { Image, Platform, ActivityIndicator, TouchableNativeFeedback, StyleSheet, Text, Modal, View, Alert } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { getCountries, getWorldStats, getCountryStats } from '../api/COVID19_API';

export default function HomeScreen() {
  const [worldStats, setWorldStats] = React.useState({});
  const [countryStats, setCountryStats] = React.useState({});
  const [countries, setCountries] = React.useState([]);
  const [currentCountry, setCurrentCountry] = React.useState({
    name: "Ghana",
    flag: "https://corona.lmao.ninja/assets/img/flags/gh.png"
  });
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  // Load countries
  React.useEffect(() => {
    if (isLoading) {
      (async () => {
        try {
          let _worldStats = await getWorldStats();
          let _countryStats = await getCountryStats(currentCountry.name);
          if (countries.length == 0)
            setCountries(await getCountries());

          setWorldStats(_worldStats);
          setCountryStats(_countryStats);
        }
        catch{
          await new Promise(resolve => {
            setTimeout(
              Alert.alert,
              1000,
              'Network Error',
              'Please check your internet connection.',
              [{ text: 'OK', onPress: resolve }],
              { cancelable: false }
            );
          });
        }
        finally {
          setLoading(false);
        }
      })();
    }
  }, [isLoading]);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>COVID-19 Worldwide</Text>
        </View>
        <View style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
          <Card
            title="Worldwide Statistics"
            icon={<Ionicons name="ios-globe" size={25} color='blue' />}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Statistic label='Confirmed' color='blue' value={worldStats.confirmed} />
              <Statistic label='Recovered' color='green' value={worldStats.recovered} />
              <Statistic label='Deaths' color='red' value={worldStats.deaths} showBorder={false} />
            </View>
          </Card>
          <Text style={{ marginTop: 20, marginBottom: 5, marginLeft: 5, fontWeight: 'bold' }}>Select Country:</Text>
          <TouchableNativeFeedback onPress={() => {
            if (countries.length == 0)
              Alert.alert("Countries not loaded", "Tap the refresh button to load the countries.");
            else
              setModalVisible(true);
          }
          }>
            <View style={{ ...styles.card, flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingRight: 15 }}>
              <Image style={{ width: 30, height: 20 }} source={{ uri: currentCountry.flag }} />
              <Text style={{ flex: 1, fontSize: 20, marginLeft: 5 }}>{currentCountry.name}</Text>
              <Ionicons name='ios-arrow-down' size={15} color='#6f6d70' />
            </View>
          </TouchableNativeFeedback>
          <Card
            title="Statistics"
            icon={<Ionicons name="md-stats" size={25} color='green' />}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Statistic label='Confirmed' color='blue' value={countryStats.confirmed} />
                <Statistic label='Active' color='#e5b45e' value={countryStats.active} />
              </View>
              <View style={{ flex: 1 }}>
                <Statistic label='Recovered' color='green' value={countryStats.recovered} />
                <Statistic label='Critical' color='#755659' value={countryStats.critical} />
              </View>
              <View style={{ flex: 1 }}>
                <Statistic label='Deaths' color='red' value={countryStats.deaths} showBorder={false} />
                <Statistic label='Tests' color='#67499b' value={countryStats.tests} showBorder={false} />
              </View>
            </View>
          </Card>
          <Text style={{ ...styles.updatedText, opacity: (countryStats.updated ? styles.updatedText.opacity : 0) }}>
            Last updated on
            <Text style={{ fontWeight: 'bold' }}>
              {moment(countryStats.updated).format(' DD/MM/YYYY [at] h:mm A')}
            </Text>
          </Text>
          <TouchableNativeFeedback
            onPress={() => {
              setLoading(true);
              setCurrentCountry(currentCountry);
            }
            }>
            <View style={styles.refreshBtn}>
              <Text style={styles.refreshBtnTxt}>REFRESH</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </ScrollView>
      <Modal visible={isModalVisible} animationType='slide' onRequestClose={() => setModalVisible(false)} >
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#fff', elevation: 4 }}>

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#edebee', true)} onPress={() => setModalVisible(false)}>
            <View style={{ borderRadius: 15, overflow: 'hidden' }}>
              <Ionicons name={Platform.os == 'ios' ? 'ios-arrow-back' : 'md-arrow-back'} size={30} />
            </View>
          </TouchableNativeFeedback>

          <Text style={{ marginLeft: 15, fontSize: 20, fontWeight: 'bold' }}>Select Country</Text>
        </View>
        <FlatList
          data={countries}
          keyExtractor={(c) => c.name}
          renderItem=
          {({ item }) =>
            <TouchableNativeFeedback
              onPress={async () => {
                setLoading(true);
                setCurrentCountry(item);
                setModalVisible(false);
              }
              }>

              <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: 60, height: 40 }} resizeMode='cover' source={{ uri: item.flag }} />
                <Text style={{ fontSize: 20, marginLeft: 10 }}>{item.name}</Text>
              </View>
            </TouchableNativeFeedback>
          }
          contentContainerStyle={{ backgroundColor: '#edebee' }}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#e0e0e0' }} />} />
      </Modal>
      <Modal visible={isLoading} transparent={true}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', opacity: 0.8 }}>
          <ActivityIndicator color='#fff' size={50} />
        </View>
      </Modal>
    </>
  );
}

function Card({ icon, title, children }) {
  return (
    <View style={{ ...styles.card, paddingHorizontal: 0 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5, paddingHorizontal: 10 }}>
        {icon}
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}
function Statistic({ label, value, color, showBorder = true }) {
  return (
    <View style={{ flex: 1, paddingLeft: 10, paddingVertical: 15, borderRightColor: '#ece9ec', borderRightWidth: (showBorder ? 1 : 0) }}>
      <Text style={{ ...styles.statisticTitle, color }}>{label}</Text>
      <Text style={styles.statValue}>{value !== undefined ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '--'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3f6',
  },
  headerView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomColor: '#b3b0b3',
    borderBottomWidth: 2
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 1
  },
  cardTitle: {
    fontSize: 20,
    marginLeft: 8
  },
  statTitle: {
    fontSize: 10
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  updatedText: {
    paddingVertical: 2,
    alignSelf: 'flex-end',
    opacity: 0.5,
    marginBottom: 40
  },
  refreshBtn: {
    backgroundColor: "green",
    elevation: 4,
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center'
  },
  refreshBtnTxt: {
    color: "white",
    fontSize: 20
  }
});
