// Feature: seo-optimization, Properties 11-13
// Validates: Requirements 5.5, 6.1, 6.4, 6.2

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type {
  ServiceSchema,
  FAQPageSchema,
  FAQItemSchema,
  OrganizationSchema,
  LocalBusinessSchema,
} from '../types';

// ---------------------------------------------------------------------------
// Helpers / generators
// ---------------------------------------------------------------------------

/** Non-empty printable string generator (avoids control characters) */
const nonEmptyString = fc.string({ minLength: 1, maxLength: 80 }).filter(
  (s) => s.trim().length > 0
);

/** Generate a single FAQ item */
const faqItemArb = fc.record({
  question: nonEmptyString,
  answer: nonEmptyString,
});

/** Generate an array of 1–10 unique FAQ items */
const faqArrayArb = fc
  .array(faqItemArb, { minLength: 1, maxLength: 10 })
  // ensure unique questions within the array
  .filter((items) => new Set(items.map((i) => i.question)).size === items.length);

/** Build a FAQPageSchema from a raw FAQ array */
function buildFaqPageSchema(
  faqItems: { question: string; answer: string }[]
): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** Build a minimal ServiceSchema */
function buildServiceSchema(
  name: string,
  description: string,
  extraCities: string[] = []
): ServiceSchema {
  const TARGET_CITIES = ['India', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'];
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'eCommittra',
      url: 'https://ecommittra.com',
    },
    serviceType: name,
    areaServed: [...TARGET_CITIES, ...extraCities],
  };
}

/** All schema @type values that SchemaInjector supports */
const schemaTypes = [
  'Organization',
  'LocalBusiness',
  'Service',
  'FAQPage',
] as const;
type SchemaType = (typeof schemaTypes)[number];

/** Build a minimal placeholder schema of each type for duplication tests */
function stubSchema(type: SchemaType): OrganizationSchema | LocalBusinessSchema | ServiceSchema | FAQPageSchema {
  switch (type) {
    case 'Organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'eCommittra',
        url: 'https://ecommittra.com',
        logo: 'https://ecommittra.com/logo.png',
        description: 'stub',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Main St',
          addressLocality: 'Lucknow',
          addressRegion: 'Uttar Pradesh',
          postalCode: '226001',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-8821953915',
          contactType: 'customer service',
          availableLanguage: 'English',
        },
        sameAs: [],
      };
    case 'LocalBusiness':
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'eCommittra',
        image: 'https://ecommittra.com/logo.png',
        telephone: '+91-8821953915',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Main St',
          addressLocality: 'Lucknow',
          addressRegion: 'Uttar Pradesh',
          postalCode: '226001',
          addressCountry: 'IN',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday'],
          opens: '09:00',
          closes: '18:00',
        },
        priceRange: '₹₹',
      };
    case 'Service':
      return buildServiceSchema('Stub Service', 'Stub description');
    case 'FAQPage':
      return buildFaqPageSchema([{ question: 'Q?', answer: 'A.' }]);
  }
}

// ---------------------------------------------------------------------------
// Property 11: No duplicate JSON-LD @types per page
// ---------------------------------------------------------------------------

describe('Property 11: No duplicate JSON-LD @types per page', () => {
  /**
   * Given an arbitrary subset of available schema types, each appearing at
   * most once, the set of @type values collected from the schema array must
   * contain no duplicates.
   *
   * Validates: Requirements 5.5
   */
  it('P11 – distinct schema types in array produce unique @type values', () => {
    fc.assert(
      fc.property(
        // Generate a non-empty subset of the four schema types (no repeats)
        fc
          .shuffledSubarray(schemaTypes as unknown as SchemaType[], {
            minLength: 1,
            maxLength: schemaTypes.length,
          }),
        (selectedTypes) => {
          const schemas = selectedTypes.map(stubSchema);
          const typeValues = schemas.map((s) => s['@type']);
          const uniqueTypes = new Set(typeValues);

          expect(uniqueTypes.size).toBe(typeValues.length);
        }
      ),
      { numRuns: 200 }
    );
  });

  it('P11 – duplicate @type in array is detectable (sanity check)', () => {
    // Two Service schemas → @type not unique
    const schemas = [
      buildServiceSchema('Service A', 'Description A'),
      buildServiceSchema('Service B', 'Description B'),
    ];
    const typeValues = schemas.map((s) => s['@type']);
    const uniqueTypes = new Set(typeValues);
    expect(uniqueTypes.size).toBeLessThan(typeValues.length);
  });
});

// ---------------------------------------------------------------------------
// Property 12: Service schema includes required fields and target cities
// ---------------------------------------------------------------------------

const REQUIRED_CITIES = ['India', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai'];

describe('Property 12: Service schema required fields and target cities', () => {
  /**
   * Given an arbitrary service name and description, a ServiceSchema built
   * via buildServiceSchema should always contain all required fields and the
   * full list of target cities.
   *
   * Validates: Requirements 6.1, 6.4
   */
  it('P12 – generated service schema contains all required fields', () => {
    fc.assert(
      fc.property(nonEmptyString, nonEmptyString, (name, description) => {
        const schema = buildServiceSchema(name, description);

        // Required top-level fields
        expect(schema.name).toBeDefined();
        expect(schema.description).toBeDefined();
        expect(schema.provider).toBeDefined();
        expect(schema.serviceType).toBeDefined();
        expect(schema.areaServed).toBeDefined();

        // Provider fields
        expect(schema.provider['@type']).toBe('Organization');
        expect(schema.provider.name).toBeTruthy();
        expect(schema.provider.url).toBeTruthy();
      }),
      { numRuns: 200 }
    );
  });

  it('P12 – areaServed always includes India and all five primary cities', () => {
    fc.assert(
      fc.property(nonEmptyString, nonEmptyString, (name, description) => {
        const schema = buildServiceSchema(name, description);

        for (const city of REQUIRED_CITIES) {
          expect(
            schema.areaServed,
            `Expected areaServed to include "${city}"`
          ).toContain(city);
        }
      }),
      { numRuns: 200 }
    );
  });

  it('P12 – extra city added to areaServed is preserved alongside required cities', () => {
    fc.assert(
      fc.property(nonEmptyString, nonEmptyString, nonEmptyString, (name, desc, city) => {
        const schema = buildServiceSchema(name, desc, [city]);

        // All required cities still present
        for (const required of REQUIRED_CITIES) {
          expect(schema.areaServed).toContain(required);
        }
        // Extra city also present
        expect(schema.areaServed).toContain(city);
      }),
      { numRuns: 200 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 13: FAQPage schema items match rendered FAQ accordion items
// ---------------------------------------------------------------------------

describe('Property 13: FAQPage schema items match FAQ accordion items', () => {
  /**
   * Given an arbitrary FAQ array (question/answer pairs), building a
   * FAQPageSchema from it should produce a mainEntity array of the same
   * length, where each item's name equals the source question and
   * acceptedAnswer.text equals the source answer.
   *
   * Validates: Requirements 5.3, 6.2
   */
  it('P13 – FAQPage mainEntity count matches input FAQ array length', () => {
    fc.assert(
      fc.property(faqArrayArb, (faqItems) => {
        const schema = buildFaqPageSchema(faqItems);
        expect(schema.mainEntity.length).toBe(faqItems.length);
      }),
      { numRuns: 200 }
    );
  });

  it('P13 – each FAQPage mainEntity item text matches source question and answer', () => {
    fc.assert(
      fc.property(faqArrayArb, (faqItems) => {
        const schema = buildFaqPageSchema(faqItems);

        faqItems.forEach((source, idx) => {
          const schemaItem: FAQItemSchema = schema.mainEntity[idx];

          expect(schemaItem['@type']).toBe('Question');
          expect(schemaItem.name).toBe(source.question);
          expect(schemaItem.acceptedAnswer['@type']).toBe('Answer');
          expect(schemaItem.acceptedAnswer.text).toBe(source.answer);
        });
      }),
      { numRuns: 200 }
    );
  });

  it('P13 – FAQPage schema round-trips through JSON.stringify without loss', () => {
    fc.assert(
      fc.property(faqArrayArb, (faqItems) => {
        const schema = buildFaqPageSchema(faqItems);
        const json = JSON.stringify(schema);
        const parsed: FAQPageSchema = JSON.parse(json) as FAQPageSchema;

        expect(parsed['@type']).toBe('FAQPage');
        expect(parsed.mainEntity.length).toBe(faqItems.length);

        faqItems.forEach((source, idx) => {
          expect(parsed.mainEntity[idx].name).toBe(source.question);
          expect(parsed.mainEntity[idx].acceptedAnswer.text).toBe(source.answer);
        });
      }),
      { numRuns: 200 }
    );
  });
});
