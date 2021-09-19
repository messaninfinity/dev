import { createStore, action } from 'easy-peasy';


export const store = createStore({
  stackinfo: {
    "app_name": "",
    "build": "",
    "output": "",
    "domaine": "",
    "plan": "",
    "email": "",
    "stack": "",
    "tag": "v1",
    "branch": "",
    "repo": "",
    "port": 8080,
    "envs":[]
  },
  addStackName: action((state, payload) => {
    state.stackinfo["app_name"] = payload;
  }),
  addStackEnv: action((state, payload) => {
    state.stackinfo["envs"] = payload;
  }),
  addStackTag: action((state, payload) => {
    state.stackinfo["tag"] = payload;
  }),
  addStackNameDetails: action((state, payload) => {
    state.stackinfo["stack"] = payload;
  }),
  addStackBuild: action((state, payload) => {
    state.stackinfo["build"] = payload;
  }),
  addStackOutput: action((state, payload) => {
    state.stackinfo["output"] = payload;
  }),
  addStackDomaine: action((state, payload) => {
    state.stackinfo["domaine"] = payload;
  }),
  addStackPlan: action((state, payload) => {
    state.stackinfo["plan"] = payload;
  }),
  addStackEmail: action((state, payload) => {
    state.stackinfo["email"] = payload;
  }),
  addStackBranch: action((state, payload) => {
    state.stackinfo["branch"] = payload;
  }),
  addStackRepo: action((state, payload) => {
    state.stackinfo["repo"] = payload;
  }),
  addStackPort: action((state, payload) => {
    state.stackinfo["port"] = payload;
  }),
});