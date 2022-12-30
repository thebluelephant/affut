export interface Followup {
    id? : string;
    company : string;
    applicationDate : string;
    jobName : string;
    announceUrl : string | null;
    status : 'toSend' | 'sent' | 'meetingPlanned' | 'refused' | 'accepted';
    userId : string;
}