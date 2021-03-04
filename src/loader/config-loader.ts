import { createEnvironmentFilter } from '../utils/filter-by-environment';
import loadFiles from '../utils/load-files';

export const configLoader = async <T>(filePattern: string, environmentFilter: string[] = []): Promise<T[]> => {
    const files = await loadFiles<T>( filePattern );
    return files.filter( createEnvironmentFilter( environmentFilter ) )
}
