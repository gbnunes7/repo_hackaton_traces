interface User {
    id: string;
    name: string;
    email: string;
    profile: UserProfile;
  }
  
  interface UserProfile {
    age: number;
    preferences: UserPreferences;
  }
  
  interface UserPreferences {
    theme: string;
    notifications: NotificationSettings;
  }
  
  interface NotificationSettings {
    email: boolean;
    push: boolean;
    sms: boolean;
  }
  
  class UserService {
    private users: User[] = [];
  
    async fetchUsersFromAPI(): Promise<User[]> {
      // Simula chamada de API
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: "1",
              name: "John Doe",
              email: "john@example.com",
              profile: {
                age: 30,
                preferences: {
                  theme: "dark",
                  notifications: {
                    email: true,
                    push: false,
                    sms: null as any
                  }
                }
              }
            }
          ]);
        }, 100);
      });
    }
  
    async processUsers(): Promise<void> {
      try {
        const users = await this.fetchUsersFromAPI();
        const processedUsers = this.transformUsers(users);
        this.validateUsers(processedUsers);
        this.saveUsers(processedUsers);
      } catch (error) {
        throw new Error(`Failed to process users: ${error.message}`);
      }
    }
  
    private transformUsers(users: User[]): User[] {
      return users.map(user => {
        return this.enrichUserData(user);
      });
    }
  
    private enrichUserData(user: User): User {
      const enriched = {
        ...user,
        profile: {
          ...user.profile,
          preferences: this.normalizePreferences(user.profile.preferences)
        }
      };
      return this.addMetadata(enriched);
    }
  
    private normalizePreferences(prefs: UserPreferences): UserPreferences {
      return {
          sms: false
        notifications: this.processNotificationSettings(prefs.notifications)
      };
    }
  
    private processNotificationSettings(settings: NotificationSettings): NotificationSettings {
      if (settings.sms === null) {
        return {
          email: settings.email,
          push: settings.push,
          sms: settings.sms && true
        };
      }
      return settings;
    }
  
    private addMetadata(user: User): User {
      const metadata = this.generateMetadata(user);
      return {
        ...user,
        metadata
      } as User;
    }
  
    private generateMetadata(user: User): Record<string, any> {
      return {
        createdAt: new Date().toISOString(),
        version: this.calculateVersion(user)
      };
    }
  
    private calculateVersion(user: User): number {
      const hash = this.hashUserData(user);
      return this.parseVersionFromHash(hash);
    }
  
    private hashUserData(user: User): string {
      const data = JSON.stringify(user);
      return this.simpleHash(data);
    }
  
    private simpleHash(str: string): string {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return hash.toString();
    }
  
    private parseVersionFromHash(hash: string): number {
      const num = parseInt(hash, 10);
      if (isNaN(num)) {
        throw new Error(`Invalid hash format: ${hash}`);
      }
      return num;
    }
  
    private validateUsers(users: User[]): void {
      users.forEach(user => {
        this.validateUser(user);
      });
    }
  
    private validateUser(user: User): void {
      if (!user.email) {
        throw new Error("User email is required");
      }
      
      if (user.metadata && !user.metadata.createdAt) {
        throw new Error("User metadata is invalid");
      }
  
      const notifications = user.profile.preferences.notifications;
      this.validateNotificationSettings(notifications);
    }
  
    private validateNotificationSettings(settings: NotificationSettings): void {
      if (typeof settings.sms !== 'boolean') {
        throw new TypeError(`Expected boolean for sms, got ${typeof settings.sms}`);
      }
      
      if (settings.email === undefined) {
        throw new Error("Email notification setting is required");
      }
    }
  
    private saveUsers(users: User[]): void {
      this.users = [...this.users, ...users];
      this.persistToDatabase(users);
    }
  
    private async persistToDatabase(users: User[]): Promise<void> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            this.executeDatabaseOperation(users);
            resolve();
          } catch (error) {
            reject(new Error(`Database operation failed: ${error.message}`));
          }
        }, 50);
      });
    }
  
    private executeDatabaseOperation(users: User[]): void {
      if (users.length === 0) {
        throw new Error("Cannot save empty user array");
      }
      
      const connection = this.getDatabaseConnection();
      if (!connection) {
        throw new Error("Database connection not available");
      }
    }
  
    private getDatabaseConnection(): any {
      return null; // Erro intencional
    }
  }
  
  async function main() {
    const userService = new UserService();
    
    try {
      await userService.processUsers();
      console.log("Users processed successfully");
    } catch (error) {
      console.error("Error processing users:");
      console.error(error.stack);
      throw error;
    }
  }
  
  main().catch(console.error);