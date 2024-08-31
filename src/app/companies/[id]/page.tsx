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

    <div className="bg-white p-6 rounded-lg shadow-sm border sm:w-[70%] w-[80%] mx-auto my-5">
      <h1 className="sm:text-4xl text-2xl font-bold text-gray-900 mb-4">{company?.startup_name}</h1>
      <div className="space-y-4">
        <div className="flex items-baseline space-y-2 md:space-y-0 md:space-x-4">

          <p className="text-gray-900 "><strong className="text-gray-700 mr-2">Analyst Rating:</strong>{company?.startup_analyst_rating}</p>
        </div>
        <div className="flex items-baseline space-y-2 md:space-y-0 md:space-x-4">

          <p className="text-gray-900"><strong className="text-gray-700 mr-2">Url:</strong>{company?.startup_url}</p>
        </div>
        <div className="flex items-baseline space-y-2 md:space-y-0 md:space-x-4">
          <p className="text-gray-900"><strong className="text-gray-700 mr-2">Partners:</strong>{company?.startup_partners}</p>
        </div>
        <div className="flex items-baseline space-y-2 md:space-y-0 md:space-x-4">

          <p className="text-gray-900"><strong className="text-gray-700 mr-2">Customers:</strong>{company?.startup_customers}</p>
        </div>
        <div className="flex items-baseline space-y-2 md:space-y-0 md:space-x-4">

          <p className="text-gray-900"><strong className="text-gray-700 mr-2">Usecases:</strong>{company?.startup_usecases}</p>
        </div>
        <div className="flex items-baseline space-y-2 md:space-y-0 md:space-x-4">

          <p className="text-gray-900"><strong className="text-gray-700 mr-2">Industry:</strong>{company?.startup_industry}</p>
        </div>
        <div className="flex items-baseline  space-y-2 md:space-y-0 md:space-x-4">

          <p className="text-gray-900"><strong className="text-gray-700 mr-2">Technology:</strong>{company?.startup_technology}</p>
        </div>
        <div className="flex items-baseline space-y-2 md:space-y-0 md:space-x-4">

          <p className="text-gray-900"><strong className="text-gray-700 mr-2">Solutions:</strong>{company?.startup_solutions}</p>
        </div>
        <div className="flex items-baseline space-y-2 md:space-y-0 md:space-x-4">

          <p className="text-gray-900"><strong className="text-gray-700 mr-2">Overview:</strong>{company?.startup_overview}</p>
        </div>
        <div className="flex items-baseline space-y-2 md:space-y-0 md:space-x-4">

          <p className="text-gray-900"><strong className="text-gray-700 mr-2">Description:</strong>{company?.startup_description}</p>
        </div>
        <div className="flex items-baseline space-y-2 md:space-y-0 md:space-x-4">

          <p className="text-gray-900"><strong className="text-gray-700 mr-2">Stage:</strong>{company?.startup_company_stage}</p>
        </div>
        <div className="flex items-baseline space-y-2 md:space-y-0 md:space-x-4">

          <p className="text-gray-900"><strong className="text-gray-700 mr-2">Country:</strong>{company?.startup_country}</p>
        </div>
        <div className="flex items-baseline space-y-2 md:space-y-0 md:space-x-4">
          <p className="text-gray-900"><strong className="text-gray-700 mr-2">Founders Info:</strong>{company?.startup_founders_info}</p>
        </div>
        <div className="flex items-baseline space-y-2 md:space-y-0 md:space-x-4">
          <p className="text-gray-900"><strong className="text-gray-700 mr-2">Emails:</strong>{company?.startup_emails}</p>
        </div>
      </div>
    </div>

    // <div>
    //   <h1><strong>Name:</strong>{company?.startup_name}</h1>
    //   <p><strong>Analyst Rating:</strong> {company?.startup_analyst_rating}</p>
    //   <p><strong>URL:</strong> {company?.startup_url}</p>
    //   <p><strong>Analyst Rating:</strong> {company?.startup_analyst_rating}</p>
    //   <p><strong>Partners:</strong> {company?.startup_partners}</p>
    //   <p><strong>Customers:</strong> {company?.startup_customers}</p>
    //   <p><strong>Use cases:</strong> {company?.startup_usecases}</p>
    //   <p><strong>Solution:</strong> {company?.startup_solutions}</p>
    //   <p><strong>Industry:</strong> {company?.startup_industry}</p>
    //   <p><strong>Technology:</strong> {company?.startup_technology}</p>
    //   <p><strong>Overview:</strong> {company?.startup_overview}</p>
    //   <p><strong>Description:</strong> {company?.startup_description}</p>
    //   <p><strong>Stage:</strong> {company?.startup_company_stage}</p>
    //   <p><strong>Country:</strong> {company?.startup_country}</p>
    //   <p><strong>Founders:</strong> {company?.startup_founders_info}</p>
    //   <p><strong>Contact:</strong> {company?.startup_emails}</p>
    // </div>
  )
}
