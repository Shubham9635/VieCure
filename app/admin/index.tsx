import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  FileText,
  Layers,
  LayoutGrid,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Clock,
} from 'lucide-react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { Badge } from '../../components/common/Badge';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import { api } from '../../services/api';
import { Enquiry, Product, Category } from '../../types';

export default function AdminDashboard() {
  const { isDark } = useTheme();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [p, c, e] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
          api.getEnquiries(),
        ]);
        setProducts(p);
        setCategories(c);
        setEnquiries(e);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <SafeScreen scrollable={false}>
      {/* Admin Header */}
      <View
        style={[
          styles.headerBar,
          {
            backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
            borderBottomColor: isDark ? Colors.borderDark : Colors.borderLight,
          },
        ]}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.replace('/(tabs)/profile')}>
          <ArrowLeft size={20} color={isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 8 }}>
          <Image
            source={require('../../assets/logo-circle.png')}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
          <View style={{ alignItems: 'center' }}>
            <Text
              style={[
                styles.headerTitle,
                { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
              ]}
            >
              Enterprise Management
            </Text>
            <Text style={styles.headerSub}>Viecure Lifesciences LLP</Text>
          </View>
        </View>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Security Banner */}
        <View
          style={[
            styles.secBanner,
            {
              backgroundColor: isDark ? 'rgba(184,151,106,0.15)' : 'rgba(184,151,106,0.2)',
              borderColor: Colors.gold,
            },
          ]}
        >
          <ShieldCheck size={18} color={Colors.goldDark} />
          <Text style={styles.secText}>
            Authorized Administrative Portal Session Active
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statBox,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <Layers size={22} color={Colors.primary} />
            <Text
              style={[
                styles.statNum,
                { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
              ]}
            >
              {products.length}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
              ]}
            >
              Active Products
            </Text>
          </View>

          <View
            style={[
              styles.statBox,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <FileText size={22} color={Colors.gold} />
            <Text
              style={[
                styles.statNum,
                { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
              ]}
            >
              {enquiries.length}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
              ]}
            >
              Logged Inquiries
            </Text>
          </View>

          <View
            style={[
              styles.statBox,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <LayoutGrid size={22} color={Colors.sage} />
            <Text
              style={[
                styles.statNum,
                { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
              ]}
            >
              {categories.length}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
              ]}
            >
              Categories
            </Text>
          </View>
        </View>

        {/* Navigation Sections */}
        <View style={styles.sectionWrap}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
            ]}
          >
            MANAGEMENT MODULES
          </Text>

          <View
            style={[
              styles.menuCard,
              {
                backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                borderColor: isDark ? Colors.borderDark : Colors.borderLight,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/admin/enquiries')}
            >
              <View style={styles.menuLeft}>
                <View style={styles.iconCircle}>
                  <FileText size={18} color={Colors.primary} />
                </View>
                <View>
                  <Text
                    style={[
                      styles.itemTitle,
                      { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                    ]}
                  >
                    Commercial Inquiries Desk
                  </Text>
                  <Text
                    style={[
                      styles.itemSub,
                      { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                    ]}
                  >
                    View buyer submissions & update follow-up statuses
                  </Text>
                </View>
              </View>
              <ChevronRight size={18} color={Colors.gray400} />
            </TouchableOpacity>

            <View
              style={[
                styles.divider,
                { backgroundColor: isDark ? Colors.borderDark : Colors.borderLight },
              ]}
            />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/admin/products')}
            >
              <View style={styles.menuLeft}>
                <View style={styles.iconCircle}>
                  <Layers size={18} color={Colors.primary} />
                </View>
                <View>
                  <Text
                    style={[
                      styles.itemTitle,
                      { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                    ]}
                  >
                    Product & Range Management
                  </Text>
                  <Text
                    style={[
                      styles.itemSub,
                      { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                    ]}
                  >
                    Audit active formulas and spotlight visibility
                  </Text>
                </View>
              </View>
              <ChevronRight size={18} color={Colors.gray400} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Inquiries List */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderRow}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
              ]}
            >
              RECENT INQUIRIES
            </Text>
            <TouchableOpacity onPress={() => router.push('/admin/enquiries')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {enquiries.length === 0 ? (
            <View
              style={[
                styles.emptyBox,
                {
                  backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                  borderColor: isDark ? Colors.borderDark : Colors.borderLight,
                },
              ]}
            >
              <Text
                style={{
                  color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight,
                  fontFamily: FontFamily.regular,
                }}
              >
                No inquiries submitted yet.
              </Text>
            </View>
          ) : (
            <View style={styles.enquiriesList}>
              {enquiries.slice(0, 3).map((enq) => (
                <View
                  key={enq.id}
                  style={[
                    styles.enqCard,
                    {
                      backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                      borderColor: isDark ? Colors.borderDark : Colors.borderLight,
                    },
                  ]}
                >
                  <View style={styles.enqTopRow}>
                    <Text
                      style={[
                        styles.enqName,
                        { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                      ]}
                    >
                      {enq.name}
                    </Text>
                    <Badge
                      label={enq.status.toUpperCase()}
                      variant={enq.status === 'new' ? 'primary' : 'sage'}
                      size="sm"
                    />
                  </View>
                  <Text
                    style={[
                      styles.enqProduct,
                      { color: isDark ? Colors.sageLight : Colors.primaryDark },
                    ]}
                  >
                    Target: {enq.productName || 'General'}
                  </Text>
                  <Text
                    style={[
                      styles.enqMessage,
                      { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                    ]}
                    numberOfLines={2}
                  >
                    {enq.message}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
  },
  headerSub: {
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.medium,
    color: Colors.sage,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  secBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  secText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.goldDark,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  statBox: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    ...Shadow.sm,
  },
  statNum: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.medium,
    textAlign: 'center',
  },
  sectionWrap: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  viewAllText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.primary,
  },
  menuCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md + 2,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(26,92,58,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: FontSize.sm + 1,
    fontFamily: FontFamily.bold,
    marginBottom: 2,
  },
  itemSub: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.regular,
  },
  divider: {
    height: 1,
    marginLeft: 56,
  },
  emptyBox: {
    padding: Spacing.xl,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  enquiriesList: {
    gap: Spacing.sm,
  },
  enqCard: {
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    ...Shadow.sm,
  },
  enqTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  enqName: {
    fontSize: FontSize.sm + 1,
    fontFamily: FontFamily.bold,
  },
  enqProduct: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
    marginBottom: 4,
  },
  enqMessage: {
    fontSize: FontSize.xs,
    lineHeight: 16,
    fontFamily: FontFamily.regular,
  },
});
