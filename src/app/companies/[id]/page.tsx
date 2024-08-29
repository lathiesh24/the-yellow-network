"use client";

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCompanyById } from '../../redux/features/companyprofile/companyProfile';
import { decryptURL } from '../../utils/shareUtils';
import { useParams } from 'next/navigation';

export default function page() {
  const dispatch = useAppDispatch();
  const { company, loading, error } = useAppSelector((state) => state.companyProfile);
  const params = useParams();

  useEffect(() => {
    let encodedOrganizationId = params.id;
    console.log(encodedOrganizationId);
    if (Array.isArray(encodedOrganizationId)) {
      encodedOrganizationId = encodedOrganizationId[0];
    }

    const decodedOrganizationId: string = decryptURL(encodedOrganizationId);
    dispatch(fetchCompanyById(decodedOrganizationId));
  }, [dispatch]);

  return (
    <div>
      <h1><strong>Name:</strong>{company?.startup_name}</h1>
      <p><strong>Analyst Rating:</strong> {company?.startup_analyst_rating}</p>
      <p><strong>URL:</strong> {company?.startup_url}</p>
      <p><strong>Analyst Rating:</strong> {company?.startup_analyst_rating}</p>
      <p><strong>Partners:</strong> {company?.startup_partners}</p>
      <p><strong>Customers:</strong> {company?.startup_customers}</p>
      <p><strong>Use cases:</strong> {company?.startup_usecases}</p>
      <p><strong>Solution:</strong> {company?.startup_solutions}</p>
      <p><strong>Industry:</strong> {company?.startup_industry}</p>
      <p><strong>Technology:</strong> {company?.startup_technology}</p>
      <p><strong>Overview:</strong> {company?.startup_overview}</p>
      <p><strong>Description:</strong> {company?.startup_description}</p>
      <p><strong>Stage:</strong> {company?.startup_company_stage}</p>
      <p><strong>Country:</strong> {company?.startup_country}</p>
      <p><strong>Founders:</strong> {company?.startup_founders_info}</p>
      <p><strong>Contact:</strong> {company?.startup_emails}</p>
    </div>
  )
}
