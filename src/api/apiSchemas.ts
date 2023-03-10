/**
 * Generated by @openapi-codegen
 *
 * @version 1.1.0
 */
export type Task = {
  /**
   * Identification
   */
  id: string;
  /**
   * Content
   */
  text: string;
  /**
   * Status
   */
  completed: boolean;
  /**
   * Date when task was created (Timestamp)
   */
  createdDate: number;
  /**
   * Date when task was completed (Timestamp)
   */
  completedDate?: number;
};

export type CreateTask = {
  /**
   * Content
   */
  text: string;
};

export type UpdateTask = {
  /**
   * Content
   */
  text: string;
};
