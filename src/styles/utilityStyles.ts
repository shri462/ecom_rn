import {StyleSheet} from 'react-native';
import {colors} from '../constants/colors';

const _ = StyleSheet.create({
  // flex-box styles
  flex_1: {flex: 1},
  flex_r: {flexDirection: 'row'},
  flex_r_start: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flex_r_start_align_end: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  flex_r_start_align_start: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  flex_c_end: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  flex_r_end: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  flex_r_center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex_r_btw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex_r_btw_align_start: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  flex_c_btw: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flex_r_even: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  flex_center: {alignItems: 'center', justifyContent: 'center'},

  // headings
  mainHeading: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.black,
  },
  formLabel: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '700',
  },

  // input elements
  textInput: {
    // backgroundColor: colors.primaryGray,
    fontSize: 14,
    borderRadius: 8,
    padding: 12,
    color: colors.black,
  },

  // paddings
  px_24: {paddingHorizontal: 24},
  p_12: {padding: 12},
  p_16: {padding: 16},
  p_8: {padding: 8},
  px_12: {paddingHorizontal: 12},
  px_16: {paddingHorizontal: 16},
  py_12: {paddingVertical: 12},
  py_8: {paddingVertical: 8},
  py_24: {paddingVertical: 24},
  py_16: {paddingVertical: 16},
  pt_12: {paddingTop: 12},
  pt_16: {paddingTop: 16},
  pt_24: {paddingTop: 24},
  pb_12: {paddingBottom: 12},
  pb_24: {paddingBottom: 24},

  // margins
  my_4: {marginVertical: 4},
  my_8: {marginVertical: 8},
  my_12: {marginVertical: 12},
  mt_8: {marginTop: 8},
  mt_4: {marginTop: 4},
  mt_16: {marginTop: 16},
  my_16: {marginVertical: 16},
  my_32: {marginVertical: 32},
  mt_24: {marginTop: 24},
  mv_24: {marginVertical: 24},
  mx_12: {marginHorizontal: 12},
  mx_16: {marginHorizontal: 16},
  mx_24: {marginHorizontal: 24},
  mb_12: {marginBottom: 12},
  mb_8: {marginBottom: 8},
  m_16: {margin: 16},
  m_4: {margin: 4},

  // container style
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
  },
  container_p_12: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 12,
  },
  container_p_16: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  container_p_20: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },

  // text styles
  white_14: {
    color: colors.white,
    fontSize: 14,
  },
  white_10_700: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  white_10: {
    color: colors.white,
    fontSize: 10,
  },
  white_14_700: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  black_16_400: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '400',
  },
  black_16_op_06: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '400',
    opacity: 0.6,
  },
  black_16_700: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '700',
  },
  black_18_400: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '400',
  },
  black_24_400: {
    color: colors.black,
    fontSize: 24,
    fontWeight: '400',
  },
  black_24_700: {
    color: '#101010',
    fontSize: 24,
    fontWeight: '700',
  },
  black_32_700: {
    color: '#101010',
    fontSize: 32,
    fontWeight: '700',
  },
  black_14_600: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '600',
  },
  black_14_700: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '700',
  },
  black_18_700: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '700',
  },
  black_14: {
    color: colors.black,
    fontSize: 14,
  },
  black_12: {
    color: colors.black,
    fontSize: 12,
  },
  black_10: {
    color: colors.black,
    fontSize: 10,
  },
  black_12_op_0_5: {
    color: colors.black,
    fontSize: 12,
    opacity: 0.5,
  },
  black_48_700: {
    color: colors.black,
    fontSize: 48,
    fontWeight: '700',
  },
});

export default _;
