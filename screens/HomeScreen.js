import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, TouchableNativeFeedback, StyleSheet, Text, Picker, View } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Ionicons, Foundation } from '@expo/vector-icons';

let worldStats = [
  {
    title: 'Confirmed',
    color: 'blue',
    value: 2994761
  },
  {
    title: 'Recovered',
    color: 'green',
    value: 878820
  },
  {
    title: 'Deaths',
    color: 'red',
    value: 206992
  }
];
let countryStats = [
  {
    title: 'Confirmed',
    color: 'blue',
    value: 1550
  },
  {
    title: 'Recovered',
    color: 'green',
    value: 155
  },
  {
    title: 'Deaths',
    color: 'red',
    value: 11
  },
  {
    title: 'Active',
    color: '#fccc5d',
    value: 1384
  },
  {
    title: 'Critical',
    color: '#865e60',
    value: 4
  },
  {
    title: 'Tests',
    color: '#5a3e71',
    value: 100622
  }
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>COVID-19 Worldwide</Text>
      </View>
      <View style={{ paddingHorizontal: 10, paddingVertical: 15 }}>
        <Card
          title="Worldwide Statistics"
          icon={<Ionicons name="ios-globe" size={25} color='blue' />}>
          <FlatList
            numColumns={3}
            data={worldStats}
            key={(x) => x.title}
            renderItem={Statistic} />
        </Card>
        <Text style={{ marginTop: 20, marginBottom: 5, fontWeight: 'bold' }}>Select country:</Text>
        <TouchableNativeFeedback>
          <View style={{ ...styles.card, flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingRight: 15 }}>
            <Image width={30} height={30} source={{ uri: "https://corona.lmao.ninja/assets/img/flags/gh.png" }} />
            <Text style={{ flex: 1, fontSize: 20 }}>Ghana</Text>
            <Ionicons name='ios-arrow-down' size={15} color='#6f6d70' />
          </View>
        </TouchableNativeFeedback>
        <Card
          title="Statistics"
          icon={<Foundation name="graph-bar" size={25} color='green' />}>
          <FlatList
            numColumns={3}
            data={countryStats}
            key={(x) => x.title}
            renderItem={Statistic} />
        </Card>
      </View>
    </ScrollView>
  );
}

function Card({ icon, title, children }) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        {icon}
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function Statistic({ item }) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 0, paddingVertical: 15 }}>
      <Text style={{ ...styles.statisticTitle, color: item.color }}>{item.title}</Text>
      <Text style={styles.statValue}>{item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
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
