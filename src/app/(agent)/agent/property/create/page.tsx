'use client'

import PropertyFormFields from '@/src/components/PropertyFormFields';
import { ReactNode } from 'react';

export default function CreateAgentProperty(): ReactNode {

  return (
    <>
      <PropertyFormFields
        useFor={"Create"}
      />
    </>
  )
}
