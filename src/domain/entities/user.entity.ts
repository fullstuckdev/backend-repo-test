export class User {
  private constructor(
    private readonly _id: string,
    private readonly _email: string,
    private _name: string,
    private readonly _createdAt: Date,
    private _updatedAt: Date
  ) {
    this.validateEmail(_email);
  }

  static create(props: UserProps): User {
    return new User(
      props.id,
      props.email,
      props.name,
      props.createdAt || new Date(),
      props.updatedAt || new Date()
    );
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  // Getters and methods
  get id(): string { return this._id; }
  get email(): string { return this._email; }
  get name(): string { return this._name; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }

  updateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
    this._name = name.trim();
    this._updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this._id,
      email: this._email,
      name: this._name,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    };
  }
}

export interface UserProps {
  id: string;
  email: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
} 