
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';

const categories = [
  { name: 'All', icon: '✨' },
  { name: 'Hair', icon: '💇' },
  { name: 'Moving', icon: '📦' },
  { name: 'Lawn Care', icon: '🌱' },
  { name: 'Auto', icon: '🚗' },
  { name: 'Fitness', icon: '🏋️' },
];

const providers = [
  { name: 'Marcus Johnson', service: 'Professional Haircuts', category: 'Hair', price: '$25', rating: '4.9', initials: 'MJ', color: '#DCE9D8' },
  { name: 'GreenScape Services', service: 'Lawn Care & Maintenance', category: 'Lawn Care', price: '$45', rating: '5.0', initials: 'GS', color: '#E8E5D5' },
  { name: 'Alex Rivera', service: 'Car Detailing', category: 'Auto', price: '$60', rating: '4.8', initials: 'AR', color: '#DDE6EC' },
  { name: 'Jordan Fitness', service: 'Personal Training', category: 'Fitness', price: '$35', rating: '5.0', initials: 'JF', color: '#E9DFE9' },
];

export default function HomeScreen() {
  const [selected, setSelected] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = providers.filter((provider) => {
    const matchesCategory = selected === 'All' || provider.category === selected;
    const matchesSearch = `${provider.name} ${provider.service}`.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F2" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>up<Text style={styles.logoAccent}>&</Text>comer.</Text>
            <Text style={styles.tagline}>Discover talent. Support ambition.</Text>
          </View>
          <Pressable style={styles.location}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationText}>Los Angeles</Text>
            <Text style={styles.chevron}>⌄</Text>
          </Pressable>
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>THE NEXT BIG THING STARTS LOCAL</Text>
          <Text style={styles.heroTitle}>Discover your next{'\n'}favorite <Text style={styles.heroGreen}>local pro.</Text></Text>
          <Text style={styles.heroDescription}>
            Find rising talent in your neighborhood. Great service, honest prices.
          </Text>

          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="What service are you looking for?"
              placeholderTextColor="#92958B"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Explore categories</Text>
            <Text style={styles.sectionSubtitle}>Find the right person for the job.</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
            {categories.map((category) => (
              <Pressable
                key={category.name}
                onPress={() => setSelected(category.name)}
                style={[styles.category, selected === category.name && styles.categoryActive]}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[styles.categoryName, selected === category.name && styles.categoryNameActive]}>
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Rising local talent</Text>
            <Text style={styles.sectionSubtitle}>Get quality service while supporting someone on the rise.</Text>
          </View>

          {filtered.length === 0 ? (
            <Text style={styles.empty}>No providers found. Try another search.</Text>
          ) : (
            filtered.map((provider) => (
              <Pressable key={provider.name} style={styles.providerCard}>
                <View style={[styles.avatar, { backgroundColor: provider.color }]}>
                  <Text style={styles.avatarText}>{provider.initials}</Text>
                </View>
                <View style={styles.providerInfo}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  <Text style={styles.providerService}>{provider.service}</Text>
                  <Text style={styles.rating}>★ {provider.rating}  ·  Local rising talent</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{provider.price}</Text>
                  <Text style={styles.priceLabel}>from</Text>
                </View>
              </Pressable>
            ))
          )}
        </View>

        <View style={styles.callout}>
          <Text style={styles.calloutEyebrow}>YOUR TALENT. YOUR BUSINESS.</Text>
          <Text style={styles.calloutTitle}>Ready to get discovered?</Text>
          <Text style={styles.calloutText}>Turn your skills into your next opportunity.</Text>
          <Pressable style={styles.calloutButton}>
            <Text style={styles.calloutButtonText}>Become a provider  →</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>up&comer.</Text>
          <Text style={styles.footerText}>Support local. Discover what's next.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F2' },
  header: { paddingTop: 58, paddingHorizontal: 22, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: 29, fontWeight: '900', color: '#202D25', letterSpacing: -1.5 },
  logoAccent: { color: '#75A66A' },
  tagline: { fontSize: 10, color: '#777E73', marginTop: 2 },
  location: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 10, borderRadius: 20 },
  locationIcon: { fontSize: 12 },
  locationText: { fontSize: 11, fontWeight: '600', color: '#344238', marginHorizontal: 4 },
  chevron: { color: '#667467' },
  hero: { marginHorizontal: 18, backgroundColor: '#E8EFE2', borderRadius: 22, padding: 23, paddingTop: 28 },
  eyebrow: { fontSize: 9, fontWeight: '800', letterSpacing: 1.5, color: '#64805D' },
  heroTitle: { fontSize: 34, lineHeight: 40, fontWeight: '800', color: '#25342A', marginTop: 14, letterSpacing: -1.2 },
  heroGreen: { color: '#709B65' },
  heroDescription: { fontSize: 13, lineHeight: 20, color: '#647064', marginTop: 12, marginBottom: 22 },
  searchBox: { backgroundColor: '#FFFFFF', borderRadius: 12, height: 49, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13 },
  searchIcon: { fontSize: 25, color: '#6C806B', marginRight: 8 },
  searchInput: { flex: 1, fontSize: 12, color: '#26352B' },
  section: { marginTop: 30 },
  sectionHeading: { paddingHorizontal: 22, marginBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#25342A', letterSpacing: -0.5 },
  sectionSubtitle: { fontSize: 11, color: '#858B80', marginTop: 5, lineHeight: 16 },
  categoryRow: { paddingHorizontal: 18, gap: 10 },
  category: { width: 83, height: 91, backgroundColor: '#FFFFFF', borderRadius: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#EDEEE7' },
  categoryActive: { backgroundColor: '#E4EDDF', borderColor: '#8DAA83' },
  categoryIcon: { fontSize: 25, marginBottom: 9 },
  categoryName: { fontSize: 11, color: '#626B60', fontWeight: '600' },
  categoryNameActive: { color: '#41623C', fontWeight: '800' },
  providerCard: { backgroundColor: '#FFFFFF', marginHorizontal: 18, marginBottom: 11, borderRadius: 16, padding: 13, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EFEFE8' },
  avatar: { width: 54, height: 58, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '800', color: '#405344' },
  providerInfo: { flex: 1, marginLeft: 12 },
  providerName: { fontSize: 13, fontWeight: '800', color: '#29382E' },
  providerService: { fontSize: 10, color: '#7E857B', marginTop: 4 },
  rating: { fontSize: 9, color: '#718A63', marginTop: 7, fontWeight: '600' },
  priceContainer: { alignItems: 'flex-end', marginLeft: 5 },
  price: { fontSize: 16, fontWeight: '800', color: '#304A35' },
  priceLabel: { fontSize: 9, color: '#92988E', marginTop: 2 },
  empty: { marginHorizontal: 22, color: '#777E73', fontSize: 13, paddingVertical: 20 },
  callout: { margin: 18, marginTop: 24, padding: 22, backgroundColor: '#263B2E', borderRadius: 19 },
  calloutEyebrow: { color: '#B6D0A8', fontSize: 9, fontWeight: '800', letterSpacing: 1.3 },
  calloutTitle: { color: '#FFFFFF', fontSize: 23, fontWeight: '800', marginTop: 12 },
  calloutText: { color: '#D2DDD1', fontSize: 12, marginTop: 7 },
  calloutButton: { alignSelf: 'flex-start', backgroundColor: '#DDE9D5', borderRadius: 9, paddingVertical: 12, paddingHorizontal: 15, marginTop: 19 },
  calloutButtonText: { color: '#304B34', fontSize: 11, fontWeight: '800' },
  footer: { alignItems: 'center', paddingVertical: 25 },
  footerLogo: { color: '#314535', fontSize: 19, fontWeight: '900' },
  footerText: { color: '#92988E', fontSize: 10, marginTop: 5 },
});