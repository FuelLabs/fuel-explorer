import { cssObj } from '@fuel-ui/css';

export const styles = {
  card: cssObj({
    transition: 'transform 0.2s ease-in-out, border 0.2s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none !important',
      border: '1px solid $intentsBase8',
      backgroundImage:
        'linear-gradient($transparent, rgb(15, 15, 15)) !important',
      'html[class="fuel_light-theme"] &': {
        backgroundImage:
          'linear-gradient($transparent, rgb(245, 245, 245)) !important',
      },
    },
  }),
  image: cssObj({
    height: '40px',
    width: '40px',
    border: '1px solid $intentsBase8',
    borderRadius: '$sm',
    overflow: 'hidden',
  }),
  cardFooter: cssObj({
    flex: '0 0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }),
  details: cssObj({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }),

  link: cssObj({
    textDecoration: 'underline',
    padding: '0',
    pointerEvents: 'none',
  }),
  dot: cssObj({
    width: '$1',
    height: '$1',
    borderRadius: '50%',
    border: '1px solid #A9F6D5',
    background: '#00F58C',
    boxShadow: '0px 0px 4px 0px #00F58C',
  }),
  dotBuilding: cssObj({
    width: '$1',
    height: '$1',
    borderRadius: '50%',
    border: '1px solid #E5C06F',
    background: '#F3B42C',
    boxShadow: '0px 0px 4px 0px #F3B42C',
  }),
  tag: cssObj({
    color: '$intentsBase12',
    borderRadius: '$sm',
    padding: '0 $1',
    backgroundColor: '$gray5',
    marginRight: '8px',
  }),
  title: cssObj({
    width: '100%',
    fontWeight: 'bold',
  }),
  body: cssObj({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '$4',
    justifyContent: 'flex-start',
    padding: '$6',
    flex: '1 1 auto',
    minHeight: '95px',
  }),
  statusContainer: cssObj({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 'auto',
  }),
  panelVisible: cssObj({
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100%',
    width: '100%',
    animation: 'slideIn 0.5s forwards !important',
  }),
  panelHidden: cssObj({
    position: 'fixed',
    right: 0,
    top: 0,
    height: '100%',
    width: '100%',
    animation: 'slideOut 0.5s forwards !important',
  }),
  boxBottom: cssObj({
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    marginLeft: 'auto',
  }),
};
