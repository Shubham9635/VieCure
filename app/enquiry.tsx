import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Send, CheckCircle2, ShieldCheck } from 'lucide-react-native';
import { SafeScreen } from '../components/layout/SafeScreen';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Colors } from '../constants/colors';
import { FontFamily, FontSize, Radius, Spacing } from '../constants/theme';
import { useTheme } from '../contexts/ThemeContext';
import { api } from '../services/api';
import { Product } from '../types';

const ENQUIRY_TYPES = [
  'Wholesale / Bulk Procurement',
  'Hospital / Clinic Distribution',
  'Retail Stockist / Pharmacy',
  'Product Formula Inquiry',
  'General Question',
];

export default function EnquiryScreen() {
  const { isDark } = useTheme();
  const params = useLocalSearchParams<{ productId?: string; productName?: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>(params.productId || '');
  const [selectedProductName, setSelectedProductName] = useState<string>(
    params.productName || 'General Inquiry'
  );
  const [enquiryType, setEnquiryType] = useState<string>(ENQUIRY_TYPES[0]);

  // Form inputs
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');

  // Validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const list = await api.getProducts();
        setProducts(list);
      } catch (e) {
        console.error(e);
      }
    }
    fetchProducts();
  }, []);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please enter your full name';
    if (!phone.trim()) {
      errs.phone = 'Please enter your mobile phone number';
    } else if (phone.trim().length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (email.trim() && !email.includes('@')) {
      errs.email = 'Please provide a valid email address';
    }
    if (!message.trim()) {
      errs.message = 'Please provide details or requirements for your inquiry';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await api.submitEnquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        productId: selectedProductId || undefined,
        productName: selectedProductName,
        companyName: companyName.trim() || undefined,
        enquiryType,
        message: message.trim(),
      });

      router.replace({
        pathname: '/enquiry-success',
        params: {
          enquiryId: result.id,
          name: name.trim(),
          productName: selectedProductName,
        },
      });
    } catch (err: any) {
      Alert.alert(
        'Submission Failed',
        err.message || 'Unable to submit your inquiry. Please check your connection and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

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
          Submit Commercial Inquiry
        </Text>
        <View style={{ width: 38 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Trust Banner */}
          <View
            style={[
              styles.trustBanner,
              {
                backgroundColor: isDark ? 'rgba(26,92,58,0.2)' : Colors.forestMist,
                borderColor: isDark ? Colors.borderDark : Colors.sage,
              },
            ]}
          >
            <ShieldCheck size={20} color={Colors.primary} />
            <Text
              style={[
                styles.trustText,
                { color: isDark ? Colors.textPrimaryDark : Colors.primaryDark },
              ]}
            >
              Direct factory pricing & institutional wholesale support from Viecure Lifesciences LLP.
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formCard}>
            {/* Inquiry Type Chips */}
            <Text
              style={[
                styles.label,
                { color: isDark ? Colors.textPrimaryDark : Colors.textPrimaryLight },
              ]}
            >
              Inquiry Type *
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.typeChipsRow}
            >
              {ENQUIRY_TYPES.map((type, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.typeChip,
                    enquiryType === type && styles.typeChipSelected,
                    {
                      backgroundColor:
                        enquiryType === type
                          ? Colors.primary
                          : isDark
                          ? Colors.surfaceDark
                          : '#FFFFFF',
                      borderColor:
                        enquiryType === type
                          ? Colors.primary
                          : isDark
                          ? Colors.borderDark
                          : Colors.borderLight,
                    },
                  ]}
                  onPress={() => setEnquiryType(type)}
                >
                  <Text
                    style={[
                      styles.typeChipText,
                      {
                        color:
                          enquiryType === type
                            ? '#FFFFFF'
                            : isDark
                            ? Colors.textSecondaryDark
                            : Colors.textSecondaryLight,
                        fontWeight: enquiryType === type ? '700' : '500',
                      },
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Target Product (if any) */}
            <View style={styles.inputSpacing}>
              <Input
                label="Selected Product / Focus"
                value={selectedProductName}
                onChangeText={setSelectedProductName}
                placeholder="Product name or line"
                hint="Specify formulation or keep general inquiry"
              />
            </View>

            {/* Name */}
            <View style={styles.inputSpacing}>
              <Input
                label="Full Name *"
                value={name}
                onChangeText={(val) => {
                  setName(val);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="e.g. Dr. Rajesh Sharma"
                error={errors.name}
              />
            </View>

            {/* Phone Number */}
            <View style={styles.inputSpacing}>
              <Input
                label="Mobile Phone Number *"
                value={phone}
                onChangeText={(val) => {
                  setPhone(val);
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="e.g. +91 98765 43210"
                keyboardType="phone-pad"
                error={errors.phone}
              />
            </View>

            {/* Email */}
            <View style={styles.inputSpacing}>
              <Input
                label="Email Address (Optional)"
                value={email}
                onChangeText={(val) => {
                  setEmail(val);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="e.g. clinic@viecure.in"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />
            </View>

            {/* Company / Clinic Name */}
            <View style={styles.inputSpacing}>
              <Input
                label="Organization / Clinic Name (Optional)"
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="e.g. Apollo Skin Care & Wellness"
              />
            </View>

            {/* Message */}
            <View style={styles.inputSpacing}>
              <Input
                label="Requirements & Message *"
                value={message}
                onChangeText={(val) => {
                  setMessage(val);
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                placeholder="Tell us about required quantities, formulation requirements, or questions..."
                multiline
                numberOfLines={4}
                error={errors.message}
              />
            </View>

            <Button
              title="Submit Inquiry"
              variant="primary"
              size="lg"
              loading={submitting}
              onPress={handleSubmit}
              icon={<Send size={18} color="#FFFFFF" />}
              style={styles.submitBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  trustText: {
    fontSize: FontSize.xs + 1,
    fontFamily: FontFamily.medium,
    lineHeight: 18,
    flex: 1,
  },
  formCard: {
    gap: Spacing.xs,
  },
  label: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.bold,
    marginBottom: 6,
  },
  typeChipsRow: {
    gap: 8,
    paddingBottom: Spacing.md,
  },
  typeChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  typeChipSelected: {
    borderColor: Colors.primary,
  },
  typeChipText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
  },
  inputSpacing: {
    marginBottom: Spacing.sm,
  },
  submitBtn: {
    marginTop: Spacing.md,
  },
});
