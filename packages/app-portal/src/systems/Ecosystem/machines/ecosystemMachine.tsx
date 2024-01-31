import type { InterpreterFrom, StateFrom } from 'xstate';
import { assign, createMachine } from 'xstate';
import { FetchMachine } from '~/systems/Core';

import { PROJECTS } from '../data';
import type { Project } from '../types';

export type EcosystemInputs = {
  filter: {
    tag?: string;
    projects?: Project[];
  };
  search: {
    query?: string;
    projects?: Project[];
  };
};

type MachineContext = {
  projects: Project[];
  search: string;
  tags: string[];
  filter: string;
};

type MachineServices = {
  fetchProjectsAndTags: {
    data: {
      projects: Project[];
      tags: string[];
    };
  };
  searchProjects: {
    data: Project[];
  };
  filterProjects: {
    data: Project[];
  };
};

type EcosystemMachineEvents =
  | {
      type: 'FILTER';
      input: { tag?: string };
    }
  | {
      type: 'SEARCH';
      input: { query?: string };
    }
  | {
      type: 'FETCH_PROJECTS_AND_TAGS';
      input: null;
    }
  | {
      type: 'CLEAR_FILTER';
      input: null;
    };

const initialState: MachineContext = {
  projects: [],
  search: '',
  tags: [],
  filter: '',
};

function sortAtoZ(a: string, b: string) {
  return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
}

export const ecosystemMachine = createMachine(
  {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    tsTypes: {} as import('./ecosystemMachine.typegen').Typegen0,
    schema: {
      context: initialState as MachineContext,
      services: {} as MachineServices,
      events: {} as EcosystemMachineEvents,
    },
    predictableActionArguments: true,
    id: '(machine)',
    initial: 'idle',
    states: {
      idle: {
        on: {
          FETCH_PROJECTS_AND_TAGS: {
            target: 'fetching',
          },
          FILTER: {
            actions: ['clearSearch', 'assignFilter'],
          },
          SEARCH: {
            actions: ['clearFilter', 'assignSearch'],
          },
          CLEAR_FILTER: {
            actions: ['clearFilter'],
          },
        },
      },
      fetching: {
        tags: ['isLoading'],
        invoke: {
          src: 'fetchProjectsAndTags',
          onDone: {
            target: 'idle',
            actions: ['assignProjectsAndTags', 'clearSearchAndFilter'],
          },
        },
      },
    },
  },
  {
    services: {
      fetchProjectsAndTags: FetchMachine.create<
        null,
        MachineServices['fetchProjectsAndTags']['data']
      >({
        showError: true,
        maxAttempts: 1,
        async fetch() {
          const tagsArray = PROJECTS.reduce(
            (acc, project) => [...acc, ...project.tags],
            [] as string[]
          );
          const tags = new Set(tagsArray);
          return {
            projects: PROJECTS.sort((pa, pb) => sortAtoZ(pa.name, pb.name)),
            tags: Array.from(tags).sort(sortAtoZ),
          };
        },
      }),
    },
    actions: {
      assignFilter: assign((ctx, ev) => ({
        ...ctx,
        filter: ev.input.tag,
      })),
      assignSearch: assign((ctx, ev) => ({
        ...ctx,
        search: ev.input.query,
      })),
      assignProjectsAndTags: assign((ctx, ev) => ({
        ...ctx,
        projects: ev.data.projects,
        tags: ev.data.tags,
      })),
      clearFilter: assign((ctx) => ({
        ...ctx,
        filter: '',
      })),
      clearSearch: assign((ctx) => ({
        ...ctx,
        search: '',
      })),
      clearSearchAndFilter: assign((ctx) => ({
        ...ctx,
        search: '',
        filter: '',
      })),
    },
  }
);

export type EcosystemMachine = typeof ecosystemMachine;
export type EcosystemMachineService = InterpreterFrom<EcosystemMachine>;
export type EcosystemMachineState = StateFrom<EcosystemMachine>;
