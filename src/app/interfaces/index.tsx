export interface StartupType {
    startup_id: number;
    startup_name: string;
    startup_url: string;
    startup_gsi: string | null;
    startup_analyst_rating:string | null;
    startup_customers: string | null;
    startup_usecases: string | null; 
    startup_solutions: string | null;
    startup_industry: string | null;
    startup_technology: string | null;
    startup_overview: string | null ;
    startup_description: string | null;
    startup_company_stage:string | null;
    startup_country: string | null;
    startup_founders_info: string | null;
    startup_emails:string | null;
  }

export interface User {
    email: string;
    first_name: string;
}
  