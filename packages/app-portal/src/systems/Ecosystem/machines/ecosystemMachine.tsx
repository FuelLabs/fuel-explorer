import type { InterpreterFrom, StateFrom } from 'xstate';
import { assign, createMachine } from 'xstate';
import { FetchMachine } from '~portal/systems/Core';

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
  allProjects: Project[] | undefined;
  projects: Project[] | undefined;
  search: string;
  tags: string[];
  filter: string;
  isBuildingHidden: boolean;
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
    }
  | {
      type: 'TOGGLE_IS_BUILDING_HIDDEN';
      input: null;
    };

const initialState: MachineContext = {
  allProjects: [],
  projects: [],
  search: '',
  tags: [],
  filter: '',
  isBuildingHidden: true,
};

export function sortAtoZ(a: string, b: string) {
  return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
}

export const ecosystemMachine = createMachine(
  {
    tsTypes: {} as import('./ecosystemMachine.typegen').Typegen0,
    schema: {
      context: initialState as MachineContext,
      services: {} as MachineServices,
      events: {} as EcosystemMachineEvents,
    },
    predictableActionArguments: true,
    id: '(machine)',
    initial: 'waiting',
    states: {
      waiting: {
        tags: ['isLoading'],
        on: {
          FETCH_PROJECTS_AND_TAGS: {
            target: 'fetching',
          },
        },
      },
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
          TOGGLE_IS_BUILDING_HIDDEN: {
            actions: ['toggleIsBuildingHidden'],
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
            [] as string[],
          );
          const tags = new Set(tagsArray);
          return {
            projects: PROJECTS,
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
      toggleIsBuildingHidden: assign((ctx) => ({
        ...ctx,
        isBuildingHidden: !ctx.isBuildingHidden,
      })),
    },
  },
);

export type EcosystemMachine = typeof ecosystemMachine;
export type EcosystemMachineService = InterpreterFrom<EcosystemMachine>;
export type EcosystemMachineState = StateFrom<EcosystemMachine>;
