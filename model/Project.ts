class Project {
  public projectName: string;
  public privacy: string;
  public description: string;
  public tags: string[];
  
  constructor(projectName: string, privacy: string, description: string, tags: string[]) {
    this.projectName = projectName;
    this.privacy = privacy;
    this.description = description;
    this.tags = tags;
  }

  public getProjectName() {
    return this.projectName;
  }
  public setProjectName(name: string) {
    this.projectName = name;
  }
  public getPrivacy() {
    return this.privacy;
  }
  public setPrivacy(privacy: string) {
    this.privacy = privacy;
  }
  public getDescription() {
    return this.description;
  }
  public setDescription(privacy: string) {
    this.description = this.description;
  }
  public getTags() {
    return this.tags;
  }
  public setTags(tags: string[]) {
    this.tags = tags;
  }
}
export default Project;
