import { ActionType } from "src/enum/action-type.enum"
import { Priority } from "src/enum/priority.enum";
import { Topic } from "src/enum/topic.enum";

export type AiCommands = {
    action: ActionType.CREATE_TASK,
    payload:{
        title: string;
        topic: Topic;
        priority?: Priority;
        due_date?: string;
    }
} | {
    action: ActionType.UPDATE_TASK,
    payload:{
        id: string;
        title?: string;
        topic?: Topic;
        priority?: string;
        due_date?: string;
    }
} | {
    action: ActionType.DELETE_TASK | ActionType.MARK_COMPLETE,
    payload:{
        task_id: string;
    }
} | {
    action: ActionType.LIST_TASKS,
    payload: {
        status?: string;
        topic?: Topic;
        priority?: Priority;
    }
} | {
    action: ActionType.INVALID_COMMAND,
    payload:{
        reason: string;
    }
}