export const createEnvironmentFilter = (environments: string[]) => (object: { environment?: string, environments?: string[] }) => {
    if (environments.length === 0) {
        return true;
    }

    if (object.environment) {
        return environments.includes( object.environment );
    }

    return environments.some( (env) => {
        if (object.environments?.length === 0) {
            return true;
        }
        return object.environments?.includes( env )
    } );
};
