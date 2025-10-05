export interface Table {
    id: string;
    name: string;
    accepts_reservations: boolean;
  }

  export interface Section {
    id: string;
    name: string;
    tables: Table[];
  }

  export interface ReservationTimes {
    [day: string]: [string, string][];
  }

  export interface Branch {
    id: string;
    name: string;
    reference: string;
    accepts_reservations: boolean;
    reservation_duration: number;
    reservation_times: ReservationTimes;
    sections: Section[];
  }


  export interface BranchResponse {
    data: Branch[];
    links: {
      first: string | null;
      last: string | null;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      from: number;
      to: number;
      per_page: number;
      path: string;
    };
  }