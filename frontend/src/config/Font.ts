import { Dimensions, StyleSheet } from "react-native";

const { width: SCREENWIDTH, height: SCREENHEIGHT } = Dimensions.get("window");

const Font = StyleSheet.create({
  modalTitle: {
    fontSize: 24,
    fontFamily: "PretendardExtraBold",
  },
  modalContent: {
    fontSize: 16,
    fontFamily: "PretendardRegular",
  },
  header: {
    fontSize: 18,
    fontFamily: "PretendardMedium",
  },
  quizCount: {
    fontSize: 15,
    fontFamily: "PretendardRegular",
  },
  timeCount: {
    fontSize: 15,
    fontFamily: "PretendardBold",
  },
  emoji: {
    fontSize: 30,
  },
  hint: {
    fontSize: 14,
    fontFamily: "PretendardRegular",
  },
  mainLarge: {
    fontSize: 20,
    fontFamily: "PretendardSemiBold",
  },
  mainMiddle: {
    fontSize: 18,
    fontFamily: "PretendardMedium",
  },
  mainSmall: {
    fontSize: 12,
    fontFamily: "PretendardLight",
  },
  messages: {
    fontSize: 14,
    fontFamily: "PretendardRegular",
  },
  gameWaitingMessage: {
    fontSize: 24,
    fontFamily: "PretendardExtraBold",
  },
  score: {
    fontSize: 18,
    fontFamily: "PretendardRegular",
  },
  endScore: {
    fontSize: 16,
    fontFamily: "PretendardRegular",
  },
  myRank: {
    fontSize: 28,
    fontFamily: "PretendardExtraBold",
  },
  myRankPoint: {
    fontSize: 36,
    fontWeight: "300",
  },
  memberInfoTitle: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "PretendardExtraBold",
  },
  memberInfoContent: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "PretendardRegular",
  },
});

export default Font;
