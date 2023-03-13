import Project from "@model/Project";

class AppContext {
  private static projectName: string;
  private static projectDescription: string;
  private static projectPrivacy: string;
  private static projectTags: string[];
  private static currentProject: Project;
  private static searchWord: string;

  public static getProjectName() {
    return this.projectName;
  }
  public static setProjectName(name: string) {
    this.projectName = name;
  }

  public static getProjectDescription() {
    return this.projectDescription;
  }
  public static setProjectDescription(description: string) {
    this.projectDescription = description;
  }

  public static getProjectPrivacy() {
    return this.projectPrivacy;
  }
  public static setProjectPrivacy(privacy: string) {
    this.projectPrivacy = privacy;
  }

  public static getProjectTags() {
    return this.projectTags;
  }
  public static setProjectTags(tags: string[]) {
    this.projectTags = tags;
  }

  public static getSearchWord() {
    return this.searchWord;
  }
  public static setSearchWord(word: string) {
    this.searchWord = word;
  }

  public static getCurrentProject() {
    return this.currentProject;
  }
  public static setCurrentProject(project: Project) {
    this.currentProject = project;
  }
}
export default AppContext;
