export declare const createEnvironmentFilter: (environments: string[]) => (object: {
    environment?: string | undefined;
    environments?: string[] | undefined;
}) => boolean;
