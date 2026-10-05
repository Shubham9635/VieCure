import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  RefreshControl,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import {
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  Building,
  Check,
  Filter,
} from 'lucide-react-native';
import { SafeScreen } from '../../components/layout/SafeScreen';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/ui/StateViews';
import { Colors } from '../../constants/colors';
import { FontFamily, FontSize, Radius, Spacing, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import { api } from '../../services/api';
import { Enquiry } from '../../types';

const STATUS_FILTERS = ['all', 'new', 'contacted', 'in_progress', 'resolved'] as const;

export default function AdminEnquiriesScreen() {
  const { isDark } = useTheme();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const loadEnquiries = useCallback(async () => {
    try {
      const data = await api.getEnquiries();
      setEnquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  const onRefresh = () => {
    setRefreshing(true);
    loadEnquiries();
  };

  const handleUpdateStatus = (id: string, newStatus: Enquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    Alert.alert('Status Updated', `Enquiry marked as "${newStatus}".`);
  };

  const filteredEnquiries = enquiries.filter((e) =>
    filter === 'all' ? true : e.status === filter
  );

  return (
    <SafeScreen scrollable={false}>
      {/* Header */}
      <View
        style={[
          styles.headerBar,
          {
            backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
            borderBottomColor: isDark ? Colors.borderDark : Colors.borderLight,
          },
        ]}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color={isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight} />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
          ]}
        >
          Commercial Inquiries ({filteredEnquiries.length})
        </Text>
        <View style={{ width: 38 }} />
      </View>

      {/* Filter Tabs */}
      <View
        style={[
          styles.filterBar,
          {
            backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
            borderBottomColor: isDark ? Colors.borderDark : Colors.borderLight,
          },
        ]}
      >
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={STATUS_FILTERS}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterTabsContent}
          renderItem={({ item }) => {
            const active = filter === item;
            const label = item.replace('_', ' ').toUpperCase();
            return (
              <TouchableOpacity
                style={[
                  styles.filterTab,
                  active && styles.filterTabActive,
                  {
                    backgroundColor: active
                      ? Colors.primary
                      : isDark
                      ? 'rgba(255,255,255,0.06)'
                      : Colors.cream,
                  },
                ]}
                onPress={() => setFilter(item)}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    {
                      color: active
                        ? '#FFFFFF'
                        : isDark
                        ? Colors.textSecondaryDark
                        : Colors.textSecondaryLight,
                      fontWeight: active ? '700' : '500',
                    },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* List */}
      {filteredEnquiries.length === 0 && !loading ? (
        <EmptyState
          title="No Inquiries"
          description={`No submissions found matching the "${filter}" filter.`}
          actionLabel="Show All Inquiries"
          onAction={() => setFilter('all')}
        />
      ) : (
        <FlatList
          data={filteredEnquiries}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? Colors.surfaceDark : '#FFFFFF',
                  borderColor: isDark ? Colors.borderDark : Colors.borderLight,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.buyerName,
                      { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
                    ]}
                  >
                    {item.name}
                  </Text>
                  {item.companyName && (
                    <View style={styles.companyRow}>
                      <Building size={12} color={Colors.sage} />
                      <Text style={styles.companyText}>{item.companyName}</Text>
                    </View>
                  )}
                </View>

                <Badge
                  label={item.status.toUpperCase()}
                  variant={
                    item.status === 'new'
                      ? 'primary'
                      : item.status === 'resolved'
                      ? 'sage'
                      : 'gold'
                  }
                  size="sm"
                />
              </View>

              {/* Product Target */}
              <View
                style={[
                  styles.productRow,
                  {
                    backgroundColor: isDark ? 'rgba(26,92,58,0.2)' : Colors.forestMist,
                  },
                ]}
              >
                <Text style={styles.productLabel}>Product / Type:</Text>
                <Text style={styles.productValue}>
                  {item.productName || 'General Inquiry'} • {item.enquiryType}
                </Text>
              </View>

              {/* Message */}
              <Text
                style={[
                  styles.messageText,
                  { color: isDark ? Colors.textSecondaryDark : Colors.textSecondaryLight },
                ]}
              >
                "{item.message}"
              </Text>

              {/* Buyer Contact Actions */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.contactBtn}
                  onPress={() => Linking.openURL(`tel:${item.phone}`)}
                >
                  <Phone size={14} color={Colors.primary} />
                  <Text style={styles.contactBtnText}>{item.phone}</Text>
                </TouchableOpacity>

                {item.email && (
                  <TouchableOpacity
                    style={styles.contactBtn}
                    onPress={() => Linking.openURL(`mailto:${item.email}`)}
                  >
                    <Mail size={14} color={Colors.primary} />
                    <Text style={styles.contactBtnText}>Email</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Status Change Buttons */}
              <View style={styles.statusUpdateRow}>
                <Text style={styles.updateLabel}>Update Status:</Text>
                <View style={styles.statusBtns}>
                  {item.status !== 'contacted' && (
                    <TouchableOpacity
                      style={styles.statusAction}
                      onPress={() => handleUpdateStatus(item.id, 'contacted')}
                    >
                      <Text style={styles.statusActionText}>Contacted</Text>
                    </TouchableOpacity>
                  )}
                  {item.status !== 'resolved' && (
                    <TouchableOpacity
                      style={[styles.statusAction, styles.resolveAction]}
                      onPress={() => handleUpdateStatus(item.id, 'resolved')}
                    >
                      <Text style={[styles.statusActionText, { color: Colors.primaryDark }]}>
                        Resolve
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      )}
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
    fontSize: FontSize.md + 1,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
  },
  filterBar: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  filterTabsContent: {
    paddingHorizontal: Spacing.lg,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
  filterTabActive: {},
  filterTabText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.md,
  },
  card: {
    padding: Spacing.lg,
    borderRadius: Radius.xl,
    borderWidth: 1,
    ...Shadow.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  buyerName: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.bold,
    fontWeight: '700',
    marginBottom: 2,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  companyText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
    color: Colors.sage,
  },
  productRow: {
    padding: Spacing.sm,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
  },
  productLabel: {
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.bold,
    color: Colors.primaryDark,
  },
  productValue: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
    color: Colors.primaryDark,
  },
  messageText: {
    fontSize: FontSize.xs + 1,
    lineHeight: 18,
    fontFamily: FontFamily.regular,
    marginBottom: Spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
    marginBottom: Spacing.sm,
  },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderRadius: Radius.full,
    backgroundColor: Colors.sageLight,
  },
  contactBtnText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.bold,
    color: Colors.primaryDark,
  },
  statusUpdateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.xs,
  },
  updateLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
    color: Colors.gray400,
  },
  statusBtns: {
    flexDirection: 'row',
    gap: 6,
  },
  statusAction: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  resolveAction: {
    backgroundColor: Colors.sageLight,
  },
  statusActionText: {
    fontSize: FontSize.xs - 1,
    fontFamily: FontFamily.bold,
  },
});
