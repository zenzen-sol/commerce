import Cookies from 'js-cookie';

const COOKIE_NAME = 'age_confirm';

export const useAgeConfirmation = () => {
  let ageConfirmed = Cookies.get(COOKIE_NAME) === 'confirmed';

  const confirmAge = () => {
    ageConfirmed = true;
    Cookies.set(COOKIE_NAME, 'confirmed', { expires: 365 });
  };

  return {
    ageConfirmed,
    onAgeConfirmed: confirmAge
  };
};
