export interface Project {
    name: string;
    url: string;
    skipTestCase: string[];
    environment: string;
    loginScript?: () => Promise<void>;
}
