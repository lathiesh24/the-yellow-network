"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCompanyById } from "../../redux/features/companyprofile/companyProfile";
import { decryptURL } from "../../utils/shareUtils";
import { getUserInfo } from "../../utils/localStorageUtils";
import { userInfo } from "os";

const CompanyProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { company, loading, error } = useAppSelector(
    (state) => state.companyProfile
  );

  const params = useParams();
  let encodedOrganizationId = params.id;

  // Check if the ID is an array, and if so, take the first element
  if (Array.isArray(encodedOrganizationId)) {
    encodedOrganizationId = encodedOrganizationId[0];
  }

  // Ensure the ID is a string
  if (typeof encodedOrganizationId !== "string") {
    console.error("Invalid ID in URL");
    return <div>Error: Invalid ID in URL</div>;
  }

  const decodedOrganizationId: string = decryptURL(encodedOrganizationId);

  console.log("decodedOrganizationId", decodedOrganizationId);
  useEffect(() => {
    dispatch(fetchCompanyById(decodedOrganizationId));
  }, [dispatch, decodedOrganizationId]);

  const user = getUserInfo();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1>{company?.startup_name}</h1>
        <p>
          <strong>Analyst Rating:</strong> {company?.startup_analyst_rating}
        </p>
        <p>
          <strong>Industry:</strong> {company?.startup_industry}
        </p>
        <p>
          <strong>Technology:</strong> {company?.startup_technology}
        </p>
        <p>
          <strong>Overview:</strong> {company?.startup_overview}
        </p>
        <p>
          <strong>Description:</strong> {company?.startup_description}
        </p>
        <p>
          <strong>Stage:</strong> {company?.startup_company_stage}
        </p>
        <p>
          <strong>Country:</strong> {company?.startup_country}
        </p>
        <p>
          <strong>Founders:</strong> {company?.startup_founders_info}
        </p>
        <p>
          <strong>Contact:</strong> {company?.startup_emails}
        </p>
      </div>

      <div>
        {user?.is_superuser && (
            <button className="rounded-md p-2 px-4 border border-gray-300">
                Edit profile
            </button>
        )}
      </div>
    </div>
  );
};

export default CompanyProfilePage;
