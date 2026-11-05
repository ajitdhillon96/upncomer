
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const SIDE = 18;
const GAP = 10;
const PURPLE = '#A78BFA';
const BG = '#101014';
const CARD = '#1D1C23';

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=90`;

const categories = [
  { name: 'Hair', image: 'photo-1560066984-138dadb4c035' },
  { name: 'Moving', image: 'photo-1600518464441-9154a4dea21b' },
  { name: 'Auto Care', image: 'photo-1492144534655-ae79c964c9d7' },
  { name: 'Fitness', image: 'photo-1534438327276-14e5300c3a48' },
  { name: 'Lawn Care', image: 'photo-1558618666-fcd25c85cd64' },
  { name: 'Photography', image: 'photo-1542038784456-1ea8e935640e' },
  { name: 'Cleaning', image: 'photo-1581578731548-c64695cc6952' },
  { name: 'Junk Removal', image: 'photo-1519003722824-194d4455a60c' },
  { name: 'Beauty', image: 'photo-1522335789203-aabd1fc54bc9' },
  { name: 'Handyman', image: 'photo-1581244277943-fe4a9c777189' },
  { name: 'Pet Care', image: 'photo-1450778869180-41d0601e046e' },
  { name: 'Personal Chef', image: 'photo-1556911220-e15b29be8c8f' },
  { name: 'Painting', image: 'photo-1562259949-e8e7689d7828' },
  { name: 'Music', image: 'photo-1516280440614-37939bbacd81' },
  { name: 'Event Planning', image: 'photo-1511795409834-ef04bbd61622' },
  { name: 'Interior Design', image: 'photo-1600210492486-724fe5c67fb0' },
  { name: 'Carpentry', image: 'photo-1504148455328-c376907d081c' },
  { name: 'Massage', image: 'photo-1544161515-4ab6ce6db874' },
  { name: 'Dance', image: 'photo-1504609813442-a8924e83f76e' },
  { name: 'Other Services', image: 'photo-1521737711867-e3b97375f902' },
  { name: 'Tutoring', image: 'photo-1503676260728-1c00da094a0b' },
];

const providers = [
  { name: 'Jordan Williams', service: 'Barber & Hair Stylist', category: 'Hair', price: '$35', rating: '4.9', image: 'photo-1500648767791-00dcc994a43e' },
  { name: 'Taylor Morgan', service: 'Independent Stylist', category: 'Hair', price: '$45', rating: '4.8', image: 'photo-1534528741775-53994a69daeb' },
  { name: 'Alex Rivera', service: 'Personal Trainer', category: 'Fitness', price: '$30', rating: '5.0', image: 'photo-1506794778202-cad84cf45f1d' },
  { name: 'Sam Carter', service: 'Moving Specialist', category: 'Moving', price: '$50', rating: '4.9', image: 'photo-1531123897727-8f129e1688ce' },
  { name: 'Jamie Lee', service: 'Auto Detailer', category: 'Auto Care', price: '$40', rating: '4.7', image: 'photo-1507003211169-0a1dd7228f2d' },
  { name: 'Casey Brooks', service: 'Fitness Coach', category: 'Fitness', price: '$55', rating: '4.9', image: 'photo-1524504388940-b1c1722653e1' },
];

export default function HomeScreen() {
  const [experience, setExperience] = useState<'choice' | 'customer' | 'business'>('choice');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openBusinessFaq, setOpenBusinessFaq] = useState<number | null>(null);
  const businessScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (experience === 'business') {
      requestAnimationFrame(() => businessScrollRef.current?.scrollTo({ y: 0, animated: false }));
    }
  }, [experience]);

  const query = search.trim().toLowerCase();

  const filteredCategories = useMemo(() => {
    return categories.filter(item =>
      item.name.toLowerCase().includes(query)
    );
  }, [query]);

  const filteredProviders = useMemo(() => {
    return providers.filter(item => {
      const matchesCategory =
        !selectedCategory || item.category === selectedCategory;

      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.service.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [query, selectedCategory]);


  const showProviders = selectedCategory !== null || query.length > 0;

  if (experience === 'choice') {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <View style={styles.choiceScreen}>
          <View style={styles.choiceBrand}>
            <Text style={styles.logo}>up<Text style={styles.logoPurple}>&</Text>comer.</Text>
            <Text style={styles.tagline}>LOCAL TALENT, BIG POTENTIAL</Text>
          </View>
          <View style={styles.choiceIntro}>
            <Text style={styles.eyebrow}>WELCOME TO UP&COMER</Text>
            <Text style={styles.choiceHeading}>What brings{ '\n' }you here?</Text>
            <Text style={styles.choiceSubheading}>Choose how you'd like to use the marketplace.</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue as a customer"
            style={styles.choiceCard}
            onPress={() => setExperience('customer')}
          >
            <View style={styles.choiceIcon}><Text style={styles.choiceIconText}>⌕</Text></View>
            <View style={styles.choiceCopy}>
              <Text style={styles.choiceTitle}>I'm a Customer</Text>
              <Text style={styles.choiceDescription}>Discover and book talented local service providers.</Text>
            </View>
            <Text style={styles.choiceArrow}>→</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continue as a business"
            style={[styles.choiceCard, styles.businessChoiceCard]}
            onPress={() => setExperience('business')}
          >
            <View style={styles.choiceIcon}><Text style={styles.choiceIconText}>↗</Text></View>
            <View style={styles.choiceCopy}>
              <Text style={styles.choiceTitle}>I'm a Business</Text>
              <Text style={styles.choiceDescription}>Showcase your services, connect with customers, and grow.</Text>
            </View>
            <Text style={styles.choiceArrow}>→</Text>
          </Pressable>
          <Text style={styles.choiceFootnote}>ONE MARKETPLACE. TWO DISTINCT EXPERIENCES.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (experience === 'business') {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <View style={styles.businessHeader}>
          <View>
            <Text style={styles.logo}>up<Text style={styles.logoPurple}>&</Text>comer.</Text>
            <Text style={styles.tagline}>BUSINESS</Text>
          </View>
          <Pressable style={styles.switchButton} onPress={() => setExperience('choice')}>
            <Text style={styles.switchButtonText}>Switch experience</Text>
          </Pressable>
        </View>
        <ScrollView ref={businessScrollRef} contentContainerStyle={styles.businessContent}>
          <Text style={styles.eyebrow}>YOUR BUSINESS STARTS HERE</Text>
          <Text style={styles.heading}>Turn your talent{ '\n' }into opportunity.</Text>
          <Text style={styles.subheading}>Build your presence, meet new customers, and grow your business with Up&comer.</Text>
          <Text style={styles.businessIntroText}>Whether you're just getting started or already growing, Up&comer is designed to help local businesses get noticed and connect with more customers.</Text>
          <View style={styles.businessBenefits}>
            <View style={styles.businessBenefitCard}>
              <Text style={styles.businessBenefitIcon}>◎</Text>
              <Text style={styles.businessBenefitTitle}>Find new customers</Text>
              <Text style={styles.businessBenefitText}>Get discovered by people looking for the services you offer.</Text>
            </View>
            <View style={styles.businessBenefitCard}>
              <Text style={styles.businessBenefitIcon}>↗</Text>
              <Text style={styles.businessBenefitTitle}>Grow your reputation</Text>
              <Text style={styles.businessBenefitText}>Build your profile, earn customer reviews, and grow your name.</Text>
            </View>
            <View style={styles.businessBenefitCard}>
              <Text style={styles.businessBenefitIcon}>▦</Text>
              <Text style={styles.businessBenefitTitle}>Manage your work</Text>
              <Text style={styles.businessBenefitText}>Keep customer requests, bookings, and appointments organized.</Text>
            </View>
          </View>
          <Pressable style={styles.businessPrimaryButton} onPress={() => {}}>
            <Text style={styles.businessPrimaryButtonText}>Get started — coming soon</Text>
          </Pressable>
          <Text style={styles.businessComingSoonNote}>Business registration is not available in this demo yet.</Text>
          <View style={styles.businessFaqSection}>
            <Text style={styles.businessFaqHeading}>Frequently asked questions</Text>
            {[
              { question: 'Who can join Up&comer?', answer: 'Local service providers and small businesses across a range of categories. Whether you’re just starting out or already have an established business, the goal is to help customers discover your services.' },
              { question: 'Does it cost anything to join?', answer: 'Membership and pricing details are still being worked out. We will share the details before registration opens.' },
              { question: 'How do I receive bookings?', answer: 'The platform is being designed to help customers discover businesses and request services. The booking experience is still in development.' },
              { question: 'How do payments work?', answer: 'Secure payments and provider payouts are planned features. The exact payment process and terms have not been finalized.' },
              { question: 'Can I join if I’m just starting out?', answer: 'Yes. Up&comer is being built to give emerging providers a place to showcase their services and build a customer base.' },
            ].map((faq, index) => (
              <View key={faq.question} style={styles.businessFaqItem}>
                <Pressable
                  style={styles.businessFaqQuestion}
                  onPress={() => setOpenBusinessFaq(openBusinessFaq === index ? null : index)}
                  accessibilityRole="button"
                  accessibilityState={{ expanded: openBusinessFaq === index }}
                >
                  <Text style={styles.businessFaqQuestionText}>{faq.question}</Text>
                  <Text style={styles.businessFaqToggle}>{openBusinessFaq === index ? '−' : '+'}</Text>
                </Pressable>
                {openBusinessFaq === index && (
                  <Text style={styles.businessFaqAnswer}>{faq.answer}</Text>
                )}
              </View>
            ))}
          </View>
          <Pressable style={styles.backToChoice} onPress={() => setExperience('choice')}>
            <Text style={styles.backToChoiceText}>‹  Back to account type</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content"/>

      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>
            up<Text style={styles.logoPurple}>&</Text>comer.
          </Text>
          <Text style={styles.tagline}>DISCOVER LOCAL TALENT</Text>
        </View>
        <Pressable style={styles.profileButton}>
          <Text style={styles.profileInitial}>U</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.mainScroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.eyebrow}>YOUR LOCAL MARKETPLACE</Text>
          <Text style={styles.heading}>
            Find your next{'\n'}
            <Text style={styles.headingAccent}>favorite.</Text>
          </Text>
          <Text style={styles.subheading}>
            Discover talented people and services near you.
          </Text>

          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search services or providers..."
              placeholderTextColor="#85818E"
              value={search}
              onChangeText={setSearch}
              returnKeyType="search"
              autoCorrect={false}
            />
            {search.length > 0 && (
              <Pressable onPress={() => setSearch('')}>
                <Text style={styles.clearSearch}>✕</Text>
              </Pressable>
            )}
          </View>

          {selectedCategory && (
            <Pressable
              onPress={() => {
                setSelectedCategory(null);
                setSearch('');
              }}
              style={styles.backButton}
            >
              <Text style={styles.backText}>‹  All categories</Text>
            </Pressable>
          )}

          {showProviders ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {selectedCategory || 'Search results'}
              </Text>
              <Text style={styles.sectionSubtitle}>
                {filteredProviders.length} sample providers
              </Text>

              {filteredProviders.length > 0 ? (
                <View style={styles.providerGrid}>
                  {filteredProviders.map(provider => (
                    <Pressable
                      key={provider.name}
                      style={styles.providerCard}
                    >
                      <Image
                        source={{ uri: photo(provider.image) }}
                        style={styles.providerImage}
                      />
                      <Text style={styles.providerName}>{provider.name}</Text>
                      <Text style={styles.providerService}>
                        {provider.service}
                      </Text>
                      <View style={styles.providerBottom}>
                        <Text style={styles.providerPrice}>
                          From ${provider.price}
                        </Text>
                        <Text style={styles.rating}>★ {provider.rating}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyTitle}>No matches yet</Text>
                  <Text style={styles.emptyText}>
                    Try another search or browse all categories.
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Explore categories</Text>
                  <Text style={styles.sectionSubtitle}>
                    Find the right person for the job.
                  </Text>
                </View>
                <Text style={styles.countLabel}>
                  {filteredCategories.length} SERVICES
                </Text>
              </View>

              {filteredCategories.length > 0 ? (
                <View style={styles.categoryGrid}>
                  {filteredCategories.map(category => (
                    <Pressable
                      key={category.name}
                      style={styles.categoryCard}
                      onPress={() => {
                        setSelectedCategory(category.name);
                        setSearch('');
                      }}
                    >
                      <Image
                        source={{ uri: photo(category.image) }}
                        style={styles.categoryImage}
                      />
                      <View style={styles.imageOverlay} />
                      <Text style={styles.categoryName}>
                        {category.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyTitle}>No categories found</Text>
                  <Text style={styles.emptyText}>
                    Try searching for a different service.
                  </Text>
                </View>
              )}
            </View>
          )}

          <View style={styles.promoCard}>
            <View style={styles.promoTag}>
              <Text style={styles.promoTagText}>FOR SERVICE PROVIDERS</Text>
            </View>
            <Text style={styles.promoTitle}>Your talent deserves to be seen.</Text>
            <Text style={styles.promoDescription}>
              Grow your business and connect with new customers.
            </Text>
            <Pressable style={styles.promoButton} onPress={() => setExperience('business')}>
              <Text style={styles.promoButtonText}>Become a provider  →</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          UP&COMER  •  LOCAL TALENT, BIG POTENTIAL
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  choiceScreen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  choiceBrand: {
    alignItems: 'center',
    marginBottom: 58,
  },
  choiceIntro: {
    marginBottom: 27,
  },
  choiceHeading: {
    color: '#FFFFFF',
    fontSize: 38,
    lineHeight: 43,
    fontWeight: '900',
    letterSpacing: -1.5,
    marginTop: 8,
  },
  choiceSubheading: {
    color: '#A39EAA',
    fontSize: 13,
    marginTop: 10,
    lineHeight: 20,
  },
  choiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D1C23',
    borderWidth: 1,
    borderColor: '#514568',
    borderRadius: 16,
    padding: 17,
    marginBottom: 13,
    minHeight: 112,
  },
  businessChoiceCard: {
    backgroundColor: '#211C2D',
    borderColor: '#715A99',
  },
  choiceIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#332B43',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },
  choiceIconText: {
    color: PURPLE,
    fontSize: 25,
    fontWeight: '700',
  },
  choiceCopy: {
    flex: 1,
  },
  choiceTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 5,
  },
  choiceDescription: {
    color: '#AAA5B3',
    fontSize: 11,
    lineHeight: 17,
  },
  choiceArrow: {
    color: PURPLE,
    fontSize: 23,
    marginLeft: 8,
  },
  choiceFootnote: {
    color: '#77727F',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginTop: 28,
  },
  businessHeader: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#292730',
  },
  switchButton: {
    borderWidth: 1,
    borderColor: '#514568',
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  switchButtonText: {
    color: PURPLE,
    fontSize: 10,
    fontWeight: '700',
  },
  businessContent: {
    paddingHorizontal: SIDE,
    paddingTop: 32,
    paddingBottom: 40,
  },
  businessIntroText: {
    color: '#A39EAA',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 2,
  },
  businessBenefits: {
    marginTop: 20,
    gap: 11,
  },
  businessBenefitCard: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: '#393541',
    borderRadius: 13,
    padding: 16,
  },
  businessBenefitIcon: {
    color: PURPLE,
    fontSize: 23,
    fontWeight: '800',
    marginBottom: 8,
  },
  businessBenefitTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  businessBenefitText: {
    color: '#AAA5B3',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  businessComingSoonNote: {
    color: '#85818E',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 9,
  },
  businessFaqSection: {
    marginTop: 31,
  },
  businessFaqHeading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
    marginBottom: 13,
  },
  businessFaqItem: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: '#393541',
    borderRadius: 11,
    marginBottom: 9,
    overflow: 'hidden',
  },
  businessFaqQuestion: {
    minHeight: 54,
    paddingHorizontal: 15,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  businessFaqQuestionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
    paddingRight: 12,
  },
  businessFaqToggle: {
    color: PURPLE,
    fontSize: 22,
    fontWeight: '500',
  },
  businessFaqAnswer: {
    color: '#AAA5B3',
    fontSize: 12,
    lineHeight: 19,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  businessWelcomeCard: {
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: '#514568',
    borderRadius: 15,
    padding: 20,
    marginTop: 18,
  },
  businessCardTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  businessCardText: {
    color: '#AAA5B3',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 9,
  },
  businessPrimaryButton: {
    backgroundColor: PURPLE,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 18,
  },
  businessPrimaryButtonText: {
    color: '#17121F',
    fontSize: 12,
    fontWeight: '900',
  },
  backToChoice: {
    alignSelf: 'center',
    marginTop: 25,
    padding: 10,
  },
  backToChoiceText: {
    color: PURPLE,
    fontSize: 12,
    fontWeight: '700',
  },
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#292730',
  },
  logo: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1.5,
  },
  logoPurple: {
    color: PURPLE,
  },
  tagline: {
    color: '#898592',
    fontSize: 9,
    marginTop: 4,
    letterSpacing: 2,
    fontWeight: '700',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: '#292531',
    borderWidth: 1,
    borderColor: '#514568',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: PURPLE,
    fontSize: 16,
    fontWeight: '800',
  },
  mainScroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SIDE,
    paddingTop: 27,
    paddingBottom: 25,
  },
  eyebrow: {
    color: PURPLE,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  heading: {
    fontSize: 36,
    lineHeight: 41,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1.5,
  },
  headingAccent: {
    color: PURPLE,
  },
  subheading: {
    color: '#A39EAA',
    fontSize: 13,
    marginTop: 10,
    marginBottom: 21,
  },
  searchBox: {
    height: 53,
    backgroundColor: CARD,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#35323D',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
  },
  searchIcon: {
    color: PURPLE,
    fontSize: 27,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    paddingVertical: 0,
  },
  clearSearch: {
    color: '#AAA5B3',
    fontSize: 17,
    padding: 5,
  },
  section: {
    marginBottom: 26,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    color: '#898592',
    fontSize: 11,
    marginTop: 4,
    marginBottom: 17,
  },
  countLabel: {
    color: PURPLE,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 13,
  },
  categoryCard: {
    width: '31%',
    aspectRatio: 1 / 1.22,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: '#393541',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  categoryName: {
    position: 'absolute',
    bottom: 10,
    left: 8,
    right: 5,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  backButton: {
    marginTop: -8,
    marginBottom: 17,
  },
  backText: {
    color: PURPLE,
    fontWeight: '700',
    fontSize: 13,
  },
  providerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  providerCard: {
    width: '31%',
    marginBottom: 21,
  },
  providerImage: {
    width: '100%',
    aspectRatio: 1 / 1.05,
    borderRadius: 11,
    backgroundColor: CARD,
  },
  providerName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 8,
  },
  providerService: {
    fontSize: 10,
    color: '#9994A2',
    marginTop: 4,
  },
  providerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  providerPrice: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  rating: {
    fontSize: 10,
    fontWeight: '700',
    color: PURPLE,
  },
  emptyState: {
    backgroundColor: CARD,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  emptyText: {
    color: '#9994A2',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  promoCard: {
    backgroundColor: '#211C2D',
    borderWidth: 1,
    borderColor: '#51416D',
    borderRadius: 15,
    padding: 19,
    marginTop: 8,
  },
  promoTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#3B2C54',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 5,
  },
  promoTagText: {
    color: '#C8B4F6',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },
  promoTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 13,
  },
  promoDescription: {
    color: '#B7AFBF',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
  },
  promoButton: {
    backgroundColor: PURPLE,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 8,
    marginTop: 16,
  },
  promoButtonText: {
    color: '#17121F',
    fontSize: 11,
    fontWeight: '900',
  },
  footer: {
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: '#292730',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 8,
    color: '#77727F',
    letterSpacing: 1.2,
    fontWeight: '700',
  },
});
