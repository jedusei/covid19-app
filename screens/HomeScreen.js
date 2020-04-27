import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, ActivityIndicator, TouchableNativeFeedback, StyleSheet, Text, Modal, View } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Ionicons, Foundation } from '@expo/vector-icons';

let countries = [];
for (let i = 0; i < 20; i++) {
  countries.push({
    id: i,
    name: "Ghana",
    flag: "https://corona.lmao.ninja/assets/img/flags/gh.png"
  });
}

export default function HomeScreen() {
  const [worldStats, setWorldStats] = React.useState({
    confirmed: 2994761,
    recovered: 878820,
    deaths: 206992
  });
  const [countryStats, setCountryStats] = React.useState({
    confirmed: 1550,
    recovered: 155,
    deaths: 11,
    active: 1384,
    critical: 4,
    tests: 100062
  });
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
          <TouchableNativeFeedback onPress={() => setModalVisible(true)}>
            <View style={{ ...styles.card, flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingRight: 15 }}>
              <Image width={30} height={30} source={{ uri: "https://corona.lmao.ninja/assets/img/flags/gh.png" }} />
              <Text style={{ flex: 1, fontSize: 20 }}>Ghana</Text>
              <Ionicons name='ios-arrow-down' size={15} color='#6f6d70' />
            </View>
          </TouchableNativeFeedback>
          <Card
            title="Statistics"
            icon={<Foundation name="graph-bar" size={25} color='green' />}>
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
        </View>
      </ScrollView>
      <Modal visible={isModalVisible} animationType='slide' onRequestClose={() => setModalVisible(false)} >
        <FlatList
          data={countries}
          key={(c) => c.id}
          renderItem=
          {({ item }) =>
            <TouchableNativeFeedback onPress={() => setModalVisible(false)}>
              <View style={{ padding: 10 }}>
                <Image width={50} height={50} source={{ uri: item.flag }} />
                <Text style={{ fontSize: 20 }}>{item.name}</Text>
              </View>
            </TouchableNativeFeedback>
          }
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#e0e0e0' }} />}
        />
      </Modal>
      <Modal visible={isLoading} transparent={true}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', opacity: 0.5 }}>
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
      <Text style={styles.statValue}>{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
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
  }
});
