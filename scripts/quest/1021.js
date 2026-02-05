/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Author: Xterminator
 * Edited by XxOsirisxX

	NPC Name: 		Roger
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Quest - Roger's Apple
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }

        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            qm.sendNext("Hey, " + (qm.getPlayer().getGender() == 0 ? "man" : "miss") + "~ What's up? Ha! I am Roger, here to teach you adorable new Maplers lots of information.");
        } else if (status == 1) {
            qm.sendNextPrev("Who made me do this? Aha!\r\nMyself! I just wanted to help you new travellers. Aren't I kind?");
        } else if (status == 2) {
            qm.sendAcceptDecline("So... let's get started! Abracadabra~!");
        } else if (status == 3) {
            if (qm.getPlayer().getHp() >= 50) {
                qm.getPlayer().updateHp(25);
            }

            if (!qm.haveItem(2010007)) {
                qm.gainItem(2010007, 1);
            }

            qm.forceStartQuest();
            qm.sendNext("Surprised? If your HP reaches 0, then you're in trouble. Now, take this #rRoger's Apple#k. Please eat it, you'll feel much better. Open the Item window and double click to consume.\r\n\r\nHow? It's very simple to open the Item window. Just press #bI#k on your keyboard.");
        } else if (status == 4) {
            qm.sendPrev("Please eat the #rRoger's Apple#k that I gave you. You'll be able to see your HP bar increasing. Please talk to me again when you recover your HP all the way!");
        } else if (status == 5) {
            qm.showInfo("UI/tutorial.img/28");
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }

        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            if (qm.c.getPlayer().getHp() < 50) {
                qm.sendNext("Hey, your HP is not fully recovered yet! Did you eat the #rRoger's Apple#k that I gave you? Are you sure?");
                qm.dispose();
            } else {
                qm.sendNext("How was your first meal? Delicious, right? You can even set a #bhotkey#k for consumables by dragging one onto the slots in the bottom right. Bet you didn't know that!\r\n\r\nOh, and if you're a beginner, your HP will slowly recover itself as time goes by. You could say this is one of the advantages of being a beginner, ha!");
            }
        } else if (status == 1) {
            qm.sendNextPrev("Alright! Now that you've learned so much, I'll give you a present. Food is a must for your travel in Maple World, so you better thank me! And don't forget to eat in an emergency!");
        } else if (status == 2) {
            qm.sendPrev("Okay, this is all I can teach you. I know it's sad, but it is time to say goodbye. Well... take care of yourself! And good luck, my friend!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
        } else if (status == 3) {
            if (qm.isQuestCompleted(1021)) {
                qm.dropMessage(1, "Unknown Error");
            } else if (qm.canHold(2010000) && qm.canHold(2010009)) {
                qm.gainExp(10);
                qm.gainItem(2010000, 3);
                qm.gainItem(2010009, 3);
                qm.forceCompleteQuest();
            } else {
                qm.dropMessage(1, "Your inventory is full");
            }
            qm.dispose();
        }
    }
}