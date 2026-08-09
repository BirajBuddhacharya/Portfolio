import { useMutation, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../lib/queryKeys';
import { placeholder } from '../data/placeholder';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const useContactLinks = () =>
  useQuery({
    queryKey: [QueryKeys.CONTACT_LINKS],
    queryFn: async () => placeholder.contactLinks,
  });

export const useSubmitContact = () =>
  useMutation({
    mutationFn: async (data: ContactFormData) => {
      // Replace with real API call: await axios.post(ApiUrls.CONTACT_SUBMIT, data)
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { success: true, message: 'Message sent!' };
    },
  });
