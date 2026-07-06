// Schema_Injector component — injects JSON-LD structured data into document head
// Uses react-helmet-async for SPA head management
// Requirements: 5.1, 5.5, 6.1

import type { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import type { OrganizationSchema, LocalBusinessSchema, ServiceSchema, FAQPageSchema } from './types';

type AnySchema = OrganizationSchema | LocalBusinessSchema | ServiceSchema | FAQPageSchema;

interface SchemaInjectorProps {
  schemas: AnySchema[];
  /** Optional page canonical URL used to key blocks and prevent duplication (Req 5.5) */
  canonical?: string;
}

/**
 * Checks whether a NAP field value is a placeholder (contains '[' or 'TBD').
 * Returns true when the value should be omitted from structured data.
 */
function isPlaceholder(value: string): boolean {
  return value.includes('[') || value.includes('TBD');
}

/**
 * Sanitise a PostalAddress object embedded in a schema by omitting placeholder fields
 * and emitting a console.warn for each omitted field.
 */
function sanitiseAddress(
  address: Record<string, unknown>
): Record<string, unknown> {
  const sanitised: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(address)) {
    if (typeof value === 'string' && isPlaceholder(value)) {
      console.warn(
        `[SchemaInjector] NAP field "${key}" contains a placeholder value ("${value}"). ` +
          'Omitting field from structured data until confirmed by the operations team.'
      );
    } else {
      sanitised[key] = value;
    }
  }
  return sanitised;
}

/**
 * Deep-clone a schema object and strip any PostalAddress placeholder fields.
 * This is applied to both Organization and LocalBusiness schemas.
 */
function sanitiseSchema(schema: AnySchema): AnySchema {
  // Validate NAP constants and warn upfront (only for LocalBusiness / Organization that carry address)
  if (schema['@type'] === 'LocalBusiness' || schema['@type'] === 'Organization') {
    const s = schema as LocalBusinessSchema | OrganizationSchema;
    if (s.address) {
      const rawAddress = s.address as unknown as Record<string, unknown>;
      const cleanAddress = sanitiseAddress(rawAddress);
      return { ...s, address: cleanAddress } as unknown as AnySchema;
    }
  }
  return schema;
}

/**
 * SchemaInjector — renders one `<script type="application/ld+json">` per schema.
 *
 * - Each block is keyed on `schema["@type"] + canonical` to prevent React from
 *   emitting duplicate blocks when the component re-renders (Req 5.5).
 * - JSON.stringify is wrapped in try/catch; failures are silently omitted with
 *   a console.error (so a bad schema never breaks the page).
 * - PostalAddress fields that are NAP placeholders are omitted with a console.warn.
 */
export function SchemaInjector({ schemas, canonical = '' }: SchemaInjectorProps): ReactElement {
  const scriptTags: ReactElement[] = [];

  for (const rawSchema of schemas) {
    const schema = sanitiseSchema(rawSchema);
    const key = `${schema['@type']}__${canonical}`;

    let json: string;
    try {
      json = JSON.stringify(schema);
    } catch (err) {
      console.error(
        `[SchemaInjector] Failed to serialize schema of type "${schema['@type']}". Block omitted.`,
        err
      );
      continue;
    }

    scriptTags.push(
      <script key={key} type="application/ld+json">
        {json}
      </script>
    );
  }

  return <Helmet>{scriptTags}</Helmet>;
}

export default SchemaInjector;
